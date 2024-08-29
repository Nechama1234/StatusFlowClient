import { Component, OnInit } from '@angular/core';
import { TransitionService } from '../../Services/transition.service';
import { ITransition } from '../../Models/Transitions.model';
import { StatusService } from '../../Services/status.service';
import { IStatus } from '../../Models/Status.model';

@Component({
  selector: 'app-transition-list',
  templateUrl: './transition-list.component.html',
  styleUrls: ['./transition-list.component.css']
})
export class TransitionListComponent implements OnInit {
  transition: string = '';
  transitions: ITransition[] = [];
  statusesFrom: IStatus[] = [];
  statusesTo: IStatus[] = [];
  SelectedStatusFrom: number | null = null;
  SelectedStatusTo: number | null = null;

  constructor(private transitionService: TransitionService,private statusService:StatusService) { }

  ngOnInit(): void {
    this.loadTransitions();
    this.loadStatuses();
  }

  loadTransitions(): void {
    this.transitionService.getTransitions().subscribe(data => {
      this.transitions = data;
    });
  }

  loadStatuses():void{
     this.statusService.getStatuses().subscribe(data=>{
     this.statusesFrom=data;
     this.statusesTo=data;
     });
  }

  addTransition(): void {
    if (this.transition.trim()) {
     const newStatus: ITransition = { transitionId: 0, name:this.transition,fromStatusId:this.SelectedStatusFrom, toStatusId:this.SelectedStatusTo }; 
    this.transitionService.addTransition(newStatus).subscribe(transition => {
      this.transitions.push(transition);
      this.transition = ''; 
      this.SelectedStatusFrom=null;
      this.SelectedStatusTo=null;
      
    });
  }
} 
deleteTransition(transition: ITransition): void {
 
  this.transitionService.deleteTransition(transition.transitionId).subscribe({
    next: () => {
      const index = this.transitions.findIndex(t => t.transitionId === transition.transitionId);
      if (index !== -1) {
        this.transitions.splice(index, 1);
      }
    },
    error: (err) => {
      alert(`Failed to delete status. Error: ${err.message}`);
    },
    complete: () => {
      this.transition = ''; // Reset the status or perform any final operations
      console.log('Delete operation completed.');
    }
  });
}

getStatusName(statusId: number|null): string {
  const status = this.statusesFrom.find(s => s.statusId === statusId);
  return status ? status.name : 'Unknown';
}

}
