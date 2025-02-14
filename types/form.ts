export type FieldType = 'text' | 'number' | 'date' | 'email' | 'textarea';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
}

export interface CustomForm {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}

export type AiGeneratedForm = {
  formTitle: string;
  formDescription: string;
  formFields: {
    formName: string;
    placeholderName: string;
    formLabel: string;
    fieldType: FieldType;
    fieldRequired: boolean;
    options?: string[];
  }[];
};