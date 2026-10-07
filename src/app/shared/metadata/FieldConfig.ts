// Define your field configuration structure
interface FieldConfig {
    controlName: string;
    label: string;
    type: 'text' | 'number' | 'checkbox' | 'date'; // Explicit type
}