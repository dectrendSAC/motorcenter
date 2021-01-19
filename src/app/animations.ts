import { trigger, transition, animate, style, query, group, state, keyframes, animateChild } from '@angular/animations';

//Routable animations
export const multipleAnimations = {
    routeTrigger: trigger('routeAnimations', [
        transition('Main => Vehiculos, Taller => Main, Vehiculos => Repuestos, Repuestos => Taller, Vehiculos => Taller', [
            query(':enter, :leave', style({ position: 'absolute', width:'100%', height:'100%', paddingBottom: '{{paddingBottomSize}}%' })),
            query(':enter', style({ transform: 'translateY(100%)' })),

            group([
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('1s ease-in-out', style({transform: 'translateY(-100%)'}))
            ]),
            query(':enter', [
                animate('1s ease-in-out', style({transform: 'translateY(0%)' })),
                animateChild()
            ]),
            query(':leave *', [
                style({}),
                animate(1, style({}))
            ])
            ])
        ]),
        transition('Vehiculos => Main, Main => Taller, Taller => Repuestos, Repuestos => Vehiculos, Taller => Vehiculos', [
            query(':enter, :leave', style({ position: 'absolute', width:'100%',height:'100%' })),
            query(':enter', style({ transform: 'translateY(-100%)' })),

            group([
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('1s ease-in-out', style({transform: 'translateY(100%)'}))
            ]),
            query(':enter', [
                animate('1s ease-in-out', style({transform: 'translateY(0%)'})),
                animateChild()
            ]),
            query(':leave *', [
                style({}),
                animate(1, style({}))
            ])
            ])
        ]),
        transition('Repuestos <=> Main, ClientePerfil <=> ClienteVehiculos', [
            query(':enter, :leave', style({ position: 'absolute', width:'100%', height:'100%', paddingBottom: '{{paddingBottomSize}}%' })),
            query(':enter', style({ opacity: 0 })),

            group([
            query(':leave', [
                style({ opacity: 1 }),
                animate('1s ease-in-out', style({opacity: 0}))
            ]),
            query(':enter', [
                animate('1s ease-in-out', style({opacity: 1})),
                animateChild()
            ]),
            query(':leave *', [
                style({}),
                animate(1, style({}))
            ])
            ])
        ])
    ]),

    slideOneTrigger: trigger('slideInOut', [
        transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
        style({}),
        animate('1s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]),

    slideTwoTrigger: trigger('slideUpDown', [
        transition(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({}),
            animate('.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
    ]),

    slideThreeTrigger: trigger('slideDownUp', [
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({}),
            animate('.3s ease-in-out', style({ transform: 'translateY(100%)' }))
        ])
    ]),

    fadeOneTrigger: trigger('fadeInOut', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('.7s ease-in-out', style({ opacity: 1}))
        ]),
        transition(':leave', [
            style({}),
            animate('.5s ease-in-out', style({ opacity: 0 }))
        ])
    ]),

    fadeTwoTrigger: trigger('fadeOut', [
        transition(':leave', [
            style({}),
            animate('.5s ease-in-out', style({ opacity: 0 }))
        ])
    ]),

    bounceTrigger: trigger('bounceIn', [
        state('fadeIn', style({})),
        transition('* => fadeIn', [
            style({ opacity: 0 }),
            animate('.7s ease-in-out', style({ opacity: 1}))
        ]),
        state('fall', style({})),
        transition('* => fall', [
            style({ transform: 'translateY(-100%)' }),
            animate('.7s ease-in-out', style({}))
        ]),
        state('bounce', style({})),
        transition('* => bounce', [
            animate('1s', keyframes([
            style({ transform: 'scale(1,1) translateY(0)' }),
            style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
            style({ transform: 'scale(0.9, 1.1) translateY(-100px)' }),
            style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
            style({ transform: 'scale(1,1) translateY(-7px)' }),
            style({ transform: 'scale(1,1) translateY(0)' }),
            ]))
        ])
    ]),

    scaleTrigger: trigger('scaleInOut', [
        transition(':enter', [
            style({ transform: 'scale(0)', transformOrigin:'center' }),
            animate('.5s ease-in-out', style({ transform: 'scale(1)', transformOrigin:'center' }))
        ]),
        transition(':leave', [
            style({}),
            animate('.5s ease-in-out', style({ transform: 'scale(0)', transformOrigin:'center' }))
        ])
    ]),
}
