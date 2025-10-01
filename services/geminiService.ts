import { GoogleGenAI, Type } from "@google/genai";
import type { UserRequirements, MaterialData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    materialName: {
      type: Type.STRING,
      description: "A novel, plausible name for the generated material.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed scientific description of the material's properties, structure, and potential applications. If the user's requirements are scientifically implausible or contradictory, explain why here and propose a viable alternative that still meets the user's core goals.",
    },
    xyzCoordinates: {
      type: Type.STRING,
      description: "A string representing the molecular structure in valid XYZ file format. The first line is the atom count, the second is the material name, and subsequent lines are 'Element X Y Z' coordinates. Generate a plausible small molecule or repeating unit (5-30 atoms) for the material.",
    },
    synthesisMethodology: {
      type: Type.STRING,
      description: "A detailed, step-by-step hypothetical synthesis methodology. Include necessary ingredients/precursors, equipment, and environmental parameters (e.g., temperature, pressure, catalysts, solvents). Structure this as a formal procedure.",
    },
    validationSummary: {
      type: Type.STRING,
      description: "A summary explaining the scientific reasoning and validation process. If any user requirements were contradictory, flag them here. Justify the plausibility of the material and its synthesis route by referencing general principles from established research and chemical knowledge from your training data. State a confidence level (e.g., High, Medium, Speculative).",
    },
  },
  required: ["materialName", "description", "xyzCoordinates", "synthesisMethodology", "validationSummary"],
};

function buildPrompt(requirements: UserRequirements): string {
  const specificProperties = [
    requirements.conductivity !== 'Not Required' && `- Electrical Conductivity: ${requirements.conductivity}`,
    requirements.elasticity !== 'Not Required' && `- Elasticity / Young's Modulus: ${requirements.elasticity}`,
    requirements.biodegradability !== 'Not Required' && `- Biodegradability: ${requirements.biodegradability}`,
  ].filter(Boolean).join('\n');

  return `
    Act as an expert consortium of computational chemists, materials scientists, and quantum physicists specializing in sustainable functional soft materials.
    Your task is to perform a comprehensive design and validation process based on user-provided requirements.
    The output must be a single, valid JSON object matching the provided schema, with no markdown.

    **Process Overview:**
    1.  **Plausibility & Consistency Analysis:** First, critically evaluate all user-provided requirements for scientific plausibility and internal consistency.
        - **Cross-Validation Check:** You MUST specifically check if the requested 'Specific Properties' (e.g., conductivity, elasticity) and 'Regulatory & Compliance Needs' are scientifically consistent with the 'Primary Functionality' and 'Intended Use Case'. For example, a request for a 'highly conductive' material for an 'electrical insulation' application is a direct contradiction.
        - **Reporting Contradictions:** If any requirements are contradictory or scientifically implausible, you MUST:
            a) Clearly state the specific contradiction in the 'description' field.
            b) Propose a more viable alternative material or a revision of the contradictory properties that still attempts to satisfy the user's core goals.
            c) Explicitly flag the specific contradiction you identified in the 'validationSummary' field.
        - If all requirements are plausible and consistent, proceed with the design.
    2.  **Material Design:** Invent a novel, hypothetical material that meets the (potentially revised) requirements.
    3.  **Methodology Generation:** Propose a detailed, step-by-step synthesis methodology for the material. This procedure should be grounded in established chemical reactions and techniques (e.g., polymerization, sol-gel, self-assembly). Include ingredients, equipment, and critical parameters.
    4.  **Validation & Reasoning:** Justify your design and methodology. Explain the scientific principles behind your choices. Act as if you are cross-referencing multiple established chemical principles and synthesis techniques to validate your proposed procedure. Conclude with a confidence assessment.

    **User Requirements:**
    - **Primary Functionality:** ${requirements.functionality}
    - **Intended Use Case:** ${requirements.useCase}
    - **Material Compatibility:** ${requirements.compatibility}
    - **Operating Environment:** ${requirements.environment}
    ${specificProperties ? `\n**Specific Properties:**\n${specificProperties}` : ''}
    ${requirements.regulatoryCompliance ? `- **Regulatory & Compliance Needs:** ${requirements.regulatoryCompliance}` : ''}

    **Final Output Instructions:**
    - Generate a scientifically plausible name.
    - Write the comprehensive description (including the plausibility and consistency analysis).
    - Generate the atomic coordinates in valid XYZ format.
    - Detail the synthesis methodology.
    - Provide the validation summary (including any flagged contradictions).
    - Return the entire response as a single JSON object.
    `;
}

export const designMaterial = async (requirements: UserRequirements): Promise<MaterialData> => {
  const prompt = buildPrompt(requirements);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text;
    const parsedData: MaterialData = JSON.parse(jsonString);

    // Basic validation
    if (!parsedData.materialName || !parsedData.description || !parsedData.xyzCoordinates || !parsedData.synthesisMethodology || !parsedData.validationSummary) {
        throw new Error("Received incomplete data from the API.");
    }

    return parsedData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error; // Re-throw original error to be handled by the UI component
  }
};