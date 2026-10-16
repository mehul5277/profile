import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [JsonPipe, UpperCasePipe],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

  CLICommands = [
    {
      command: 'ng build --output-path docs --base-href /profile/ --configuration production',
      description: 'Compiles the application into an output directory for git pages.'
    },
    {
      command: 'git checkout main',
      description: '1. Switch to the destination branch (the branch you want to merge into) (e.g., main):'
    },
    {
      command: 'git pull origin main',
      description: '2. Pull the latest updates from your remote repository to avoid conflicts:'
    },
    {
      command: 'git merge feature-branch',
      description: '3. Execute the merge by targeting the branch containing your new changes:'
    },
    {
      command: 'git push origin main',
      description: '4. Push the changes to the remote repository:'
    }
  ];
}