import { UpperCasePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';


interface ContactForm {
  title: string;
  subject: string;
  leadtext: string;
  email: string;
  phone?: string;
  linkedin?: string;

}
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [UpperCasePipe, NgTemplateOutlet],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: ContactForm = {
    title: 'Get in touch.',
    subject: 'Contact',
    leadtext: 'Ready to discuss your specific challenges and identify the best resilient solutions for your organization.',
    email: 'info@jixo.com',
    phone: '6472957472',
    linkedin: 'https://www.linkedin.com/in/mehul4ca',
  };
}
