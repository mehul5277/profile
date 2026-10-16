export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Slogan {
    id: number;
    text: string;
    title: string;
    subtitle: string;
    description?: string; // Optional field for additional details
    benefits?: string[]; // Optional field for listing benefits of the slogan
    brandValues?: string[]; // Optional field for associating brand values with the slogan
    businessImpact?: string; // Optional field for describing the business impact of the slogan
    buttonText?: string; // Optional field for call-to-action button text
    buttonLink?: string; // Optional field for call-to-action button link
    brandStory?: string; // Optional field for sharing the brand story behind the slogan
}

//https://www.google.com/search?q=angular+form+get+input+type&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDk5MzNqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8cxpBkeIeqYwoCbfNVc4vKEwpHWb4GllXaHEISn7pMuLHumWhqFU0j6EuzM_iX2yFK0S3iBlNtK5BOMl-sCHE9BVLzCsCWUe2wUamZ_DvEbgioNtNT3ebj8nzYQSv0amxpYMyMzIhaws2O-6tYluo71j-EPyr-UfHoV7rjSWBv5-ohAG_5TLpsqWuOknPGEQBdcrnvMA&aep=10&ntc=1&sxsrf=APpeQnsfdRRZGuB_4Jk2A6lmGqZUhYSfaQ%3A1791138798344&mstk=AUtExfCNsdokId-IXnes2sdJZOUU_3ODqdj0mLAXBqWitn5KC1lY7XDh5SD0bPsdNSYlsNRFmoubiQAJxfiAMtiGETyHqY1UKC0pwDZe-W0uei3kt2obnourgyZq0QoP_4i0I6aYckaVKElfmXNbx7qLmajqp7PSnvrdNp7X0BYjcRjcPizZJIBFWXm38R5KJLPT9zSgaTd3qtkvPqe7adINReosm3npuBhvj-qs2S-Y1VBR-xbIZ6o_yYOWG1yCUcc81yHo0IYoulB4D3DQITYhbkjqyxbHPBxNBoetukezbC8Y1FU-hSuGe4rZ5j7MNxae25R1WEAvm1VVqw&aioh=3&csuir=1&cs=1&mtid=DObDatjtDPPvmLQP0K2i6QM&udm=50
export interface FieldConfig {
    key: string;
    label: string;
    // Use 'select' or 'checkbox' to change the HTML element type
    type: 'text' | 'number' | 'date' | 'select' | 'checkbox';
    value?: any;
    validators?: {
        required?: boolean;
        minLength?: number;
    };
    options?: { value: string; label: string }[]; // Used only for dropdowns
    errorMessages?: { [key: string]: string };     // Validation text mappings
}