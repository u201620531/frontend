import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

export interface MenuIndex {
  menuIndex: number;
  submenuIndex: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  constructor(private _menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this._menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }

  @Input() public menuItems: Array<MenuIndex> = [];
  @Output() public itemSelected = new EventEmitter<MenuIndex>();

  public onClick(event: MouseEvent, menuIndex: number, submenuIndex: number) {
    event.stopPropagation();
    this.itemSelected.emit({
      menuIndex: menuIndex,
      submenuIndex: submenuIndex,
    });
  }
}
