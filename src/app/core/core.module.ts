import { NgModule, Optional, SkipSelf } from '@angular/core';

import { IconsModule } from 'app/core/icons/icons.module';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
    imports: [

        IconsModule,


    ],
    declarations: [

    ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
