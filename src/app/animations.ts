import { trigger, transition, animate, style, query, group, state, keyframes, animateChild } from '@angular/animations';

//Routable animations
export const multipleAnimations = {
    routeTrigger: trigger('routeAnimations', [
        transition('Main => Concesionario', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [style({ left: '-100%', opacity: 0 })]),
            query(':leave', animateChild()),
            group([
                query(':leave', [animate('1s ease-out', style({ left: '100%', opacity: 0 }))]),
                query(':enter', [animate('1s ease-out', style({ left: '0%', opacity: 1 }))])
            ]),
            query(':enter', animateChild())
        ]),
        transition('Concesionario => Main', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [style({ right: '-100%', opacity: 0 })]),
            query(':leave', animateChild()),
            group([
                query(':leave', [animate('1s ease-out', style({ right: '100%', opacity: 0 }))]),
                query(':enter', [animate('1s ease-out', style({ right: '0%', opacity: 1 }))])
            ]),
            query(':enter', animateChild())
        ]),
        transition('Main <=> Taller', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),        
            group([
                query(':enter',[
                    style({ transform: 'translateY(100%)' }),
                    animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({}),
                    animate('.5s ease-in-out', style({ transform: 'translateY(100%)' }))
                ], { optional: true }),
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
            animate('.5s ease-in-out', style({ transform: 'translateY(100%)' }))
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

    fadeThreeTrigger: trigger('fadeIn', [ 
        transition(':enter', [
          style({ opacity: 0 }),
          animate('.7s ease-in-out', style({ opacity: 1}))
        ])
    ]),

    bounceTrigger: trigger('bounceIn', [
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
    ])
}