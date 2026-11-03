import { Component } from '@angular/core';
interface Option {
  id: number;
  text: string;
  votes: number;
}

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.scss'
})
export class PollComponent {
  question: string = 'Does the police service have a problem with racism?';

  options: Option[] = [
    { id: 1, text: 'Yes, they absolutely do', votes: 142 },
    { id: 2, text: 'No, they don\'t', votes: 98 },
    { id: 3, text: 'Undecided / Neutral', votes: 65 }
  ];

  selectedOptionId: number | null = null;
  hasVoted: boolean = false;
  private storageKey = 'user_poll_vote';

  ngOnInit(): void {
    // Check if the user has already voted in a previous session
    const savedVote = localStorage.getItem(this.storageKey);
    if (savedVote !== null) {
      this.selectedOptionId = Number(savedVote);
      this.hasVoted = true;
    }
  }

  get totalVotes(): number {
    return this.options.reduce((sum, option) => sum + option.votes, 0);
  }

  vote(optionId: number): void {
    if (this.hasVoted) return;

    const selected = this.options.find(opt => opt.id === optionId);
    if (selected) {
      selected.votes++;
      this.selectedOptionId = optionId;
      this.hasVoted = true;

      // Save the user's choice to local storage so it persists across refreshes
      localStorage.setItem(this.storageKey, optionId.toString());
    }
  }

  getPercentage(votes: number): number {
    const total = this.totalVotes;
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  }
}