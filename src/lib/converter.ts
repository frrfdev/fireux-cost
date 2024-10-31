type DocumentIdObject = {
  documentId: string;
  [key: string]: unknown;
};

/**
 * Converts a populated register to a form register
 * by extracting the documentId from nested objects
 */
export function convertToFormRegister<T extends Record<string, unknown>>(register: T): Record<string, string> {
  const formRegister: Record<string, string> = {};

  for (const [key, value] of Object.entries(register)) {
    if (value && typeof value === 'object' && 'documentId' in value) {
      formRegister[key] = (value as DocumentIdObject).documentId;
    } else if (value && typeof value !== 'object') {
      formRegister[key] = String(value);
    }
  }

  return formRegister;
}

/**
 * Type guard to check if an object has a documentId property
 */
export function hasDocumentId(obj: unknown): obj is DocumentIdObject {
  return obj !== null && typeof obj === 'object' && 'documentId' in obj;
}
