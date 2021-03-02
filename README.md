# Registration - FedEx Assessment

## Description

The task was to build a fully functional registration form, so this is what I've done. Time was limited (I could spend a maximum of 6 hours on this project within the time frame) so the result isn't perfect, but I hope it will provide some insight in my skills. I've created a registration form where all fields are required. 

## Technique

The form has been build with the Angular 11 FormBuilder module. I like to only use interface logic within the components and place all other logic in a service, which I've added to the component. This makes testing and maintaining the the code easier. Wherever I can I keep logic out of the template/html. Simplicity and readability are key, is my motto. I write code for other developers, not myself. It should be easy to maintain and understand.

## Third party libraries used

I've used a few third party libraries. Why write code if you can use quality code provided by others (I'm a big believer in the Open Source philosophy). 

- [ng-bootstrap](https://ng-bootstrap.github.io/#/home)
  - Bootstrap is the most mature CSS/SASS library available. I've chosen to use the ng-bootstrap library (an Angular module wrapper around the Bootstrap library) because it doesn't require jQuery to be added to the dependencies and it allows me to build responsive and easily maintainable templates. All though I've chosen to use a framework for the current purpose, I'm comfortable with, and experienced in, building CSS and SCSS from scratch.
- [angular-fontawesome](https://github.com/FortAwesome/angular-fontawesome)
  - The angular module for the well know FontAwesome icon library. Used to add visual-clarity to the form.
- [@rxweb/reactive-form-validators](https://github.com/rxweb/rxweb/tree/master/client-side/angular/packages/reactive-form-validators#readme)
  - A mature validator library to simplify and solidify validation for the form input. Less code to develop means less code to maintain and less issues. It adds an external dependency, but in this case I seemed worth it to me.
- ESlint
  - I've replaced the default TSlint implementation within the project with ESlint, since TSlint has been depricated. Due to time limitations I haven't bee able to remove all of the TSlint residue.

## Limitations

I could have spent 5 days, writing the perfect registration form, but I didn't have the time for that and I'm assuming that what I'm providing you with here is enough for you to determine if I'm suitable for the project.

I've added some unit tests, but because of the limited time available coverage is not 100%. For the same reason I could not add e2e tests. At the same time that last subject is one that I have some experience with (I've written e2e tests for about two years), but the technique I had to use for that customer (de Volksbank) was developed in house and pretty far oof the standards. For that reason I'm not very familiar with the e2e testing framework that's integrated in Angular by default. But I would very much like to learn!

## Result

I hope I have provided you with enough code and information and I'm looking forward to your response.

