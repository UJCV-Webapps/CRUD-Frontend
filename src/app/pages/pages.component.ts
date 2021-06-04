import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public items: NbMenuItem[] = [
    {
      title: 'Usuarios',
      expanded: true,
      children: [
        {
          title: 'Registrar',
          icon: 'person-add-outline',
          link: '/dashboard/register'
        },
        {
          title: 'Administrar',
          icon: 'people-outline',
          link: '/dashboard/admin'
        },
        {
          title: 'Inactivos',
          icon: 'person-remove-outline',
          link: '/dashboard/inactive'
        }
      ],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
