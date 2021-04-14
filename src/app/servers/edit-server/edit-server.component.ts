import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactive-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  alowEdit = false;
  saveChange = false;
  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.data.subscribe((data)=>{
      console.log(data['message']);
    })
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
    this.route.queryParams.subscribe((queryParam: Params) => {
      this.alowEdit = queryParam['alowEdit'] === '1' ? true : false;
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.saveChange = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.alowEdit)
      return true;
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.saveChange) {
      return confirm("Do you want to discard the changes?")
    }
    else
      return true;
  }
}
