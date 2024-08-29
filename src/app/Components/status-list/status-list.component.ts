import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../Services/status.service';
import { IStatus } from '../../Models/Status.model';
import { TransitionService } from '../../Services/transition.service';
import { ITransition } from '../../Models/Transitions.model';
import { concatMap, Observable } from 'rxjs';
import { concat } from 'rxjs';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {
  status: string = '';
  statuses: IStatus[] = [];
  orphanStatuses: IStatus[] = [];
  transitions: ITransition[] = [];

  constructor(private statusService: StatusService,private transitionService:TransitionService) { }

  
  async ngOnInit(): Promise<void> {
    try {
      await this.loadOrphanStatuses().toPromise();
      await this.wait(2000); // המתן 2 שניות
      await this.loadTransitions().toPromise();
      await this.wait(2000); // המתן 2 שניות
      await this.loadStatuses().toPromise();
      await this.wait(2000); // המתן 2 שניות
      await this.orderData().toPromise();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  
    wait(ms: number): Promise<void> {
     return new Promise(resolve => setTimeout(resolve, ms));
 }

 loadOrphanStatuses(): Observable<void> {
  return new Observable<void>(observer => {
    this.statusService.getOrphanStatuses().subscribe(data => {
      this.orphanStatuses = data;
            observer.next();
      observer.complete();
    });
  });
}

  loadTransitions(): Observable<void> {
    return new Observable<void>(observer => {
    this.transitionService.getTransitions().subscribe(data => {
      this.transitions = data;
           observer.next();
      observer.complete();
    });
    });
  }

  loadStatuses(): Observable<void> {
    return new Observable<void>(observer => {
    this.statusService.getStatuses().subscribe(data => {
      this.statuses = data;
       observer.next();
      observer.complete();
    });
   
    });
    
  }

  orderData(): Observable<void> {
    return new Observable<void>(observer => {
      this.statuses.forEach(status => {
        status.isOrphan = this.orphanStatuses.some(s => s.name === status.name);
        status.isFinal = !this.transitions.some(t => t.fromStatusId === status.statusId);
    });
    observer.next();
      observer.complete();
    });   
  }

 

  addStatus(): void {
    if (this.status.trim()) {
     const newStatus: IStatus = { statusId: 0, name:this.status, isInitial: false,isOrphan:false,isFinal:false }; 
    this.statusService.addStatus(newStatus).subscribe(status => {
      this.statuses.push(status);
      this.status = ''; 
    });
  }
} 
deleteStatus(status: IStatus): void {
  console.log(`Deleting status with ID: ${status.statusId}`);
  
  this.statusService.deleteStatus(status.statusId).subscribe({
    next: () => {
      const index = this.statuses.findIndex(s => s.statusId === status.statusId);
      if (index !== -1) {
        this.statuses.splice(index, 1);
        console.log(`Status with ID: ${status.statusId} deleted successfully.`);
      }
    },
    error: (err) => {
      console.error(`Error deleting status with ID: ${status.statusId}. Error: ${err.message}`);
      alert(`Failed to delete status. Error: ${err.message}`);
    },
    complete: () => {
      this.status = ''; // Reset the status or perform any final operations
      console.log('Delete operation completed.');
    }
  });
}

setInitialStatus(selectedStatus: IStatus): void {
  this.statuses.forEach(status => {
    status.isInitial = (status === selectedStatus);
  });
}

}
