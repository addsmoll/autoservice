import {Component, inject, Input, ViewEncapsulation} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-clipboard-button',
    imports: [
        CommonModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './clipboard-button.component.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class ClipboardButtonComponent {
    @Input() hashTagLink: string
    @Input() isIcon: boolean;


    private clipboard = inject(Clipboard);
    private _snackBar = inject(MatSnackBar)
    /**
     *
     * Open snack bar for copy-link confirm
     */
    openSnackBar(hashTagLink: string) {
        this.clipboard.copy(hashTagLink);
        this._snackBar.open(`${hashTagLink}  Скопировано в буфер обмена`, ``, {
            duration: 1500,
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
        });
    }
}
