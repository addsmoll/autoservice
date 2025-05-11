import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import Tick from '@pqina/tick';
import Dots from '@pqina/tick/dist/view-dots/tick.view.dots.module';
import HighresFont from '@pqina/tick/dist/font-highres/tick.font.highres.module';

@Component({
    selector: 'app-tick',
    templateUrl: './tick.component.html',
    styleUrls: ['./tick.component.scss'],
    standalone: false
})

export class TickComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() time: string = null;
    @Input() startISO8106: string = null;
    @ViewChild('tick') tick: ElementRef<any>;
  constructor() { }

  ngOnInit(): void {
      // Tick.plugin.add('view', 'line', Line);
      Tick.plugin.add('view', 'dots', Dots);
      Tick.plugin.add('font', 'highres', HighresFont);
  }

    ngAfterViewInit(): void {



        var tick = Tick.DOM.create({
            value: this.time,
            credits: false,
            didInit: function(tick) {
                console.log('tick!', Tick.helper.date());

                var counter = Tick.count.down('2024', {
                    format: ['d','h','m'],
                    interval: 1000
                });
                counter.onupdate = function(value) {
                    // by default value will contain an
                    // array with days, hours, minutes, seconds
                    tick.value = value;
                };
                counter.onended = function() {
                    // reached target date!
                }

            },
            view:
            // definition for top level tick element
                {
                    children:[
                        {
                            root: 'div',

                            children: [
                                {
                                    layout: 'horizontal fit',
                                    view: 'dots',
                                    style: 'font:highres',


                                }
                            ],
                            repeat: true,

                        }
                    ]

                }
        });

// add Tick Counter to body element
        this.tick.nativeElement.appendChild(tick.root);
    }

    ngOnDestroy(): void {

    }
}
