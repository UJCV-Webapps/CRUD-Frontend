import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  currentTheme: string = "corporate";
  themeChecked: boolean;


  public items: NbMenuItem[] = [
    {
      title: 'Empleados',
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

  constructor( private _themeService: NbThemeService ) { }

  ngOnInit(): void {
    if(localStorage.getItem("theme")){
      this.currentTheme = localStorage.getItem("theme");
      this._themeService.changeTheme(this.currentTheme);
      this.themeChecked = this.currentTheme === 'dark';
    }
  }

  onChangeTheme() {
    const theme = this.themeChecked? 'dark' : 'corporate';
    this._themeService.changeTheme(theme);
    this.currentTheme = theme;
    localStorage.setItem("theme", theme);
  }

}
