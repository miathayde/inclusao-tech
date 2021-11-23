import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-curso',
  templateUrl: './video-curso.component.html',
  styleUrls: ['./video-curso.component.scss']
})
export class VideoCursoComponent implements OnInit {
  @Input() idCurso: number;

  constructor() { }

  ngOnInit(): void {
  }

}
