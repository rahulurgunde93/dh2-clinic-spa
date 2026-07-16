# Dh2ClinicSpa

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Architecture

This project follows an enterprise Angular architecture.

Core
Shared
Features
Layout
Store
Assets
Environment
Angular Material
NgRx
Signals
REST API
Feature-first development.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Project Tree

dh2-clinic-spa
├─ .angular
├─ .editorconfig
├─ angular-structure.txt
├─ angular.json
├─ development-api
│  └─ Dh2Clinic.DevApi
│     ├─ appsettings.Development.json
│     ├─ appsettings.json
│     ├─ Dh2Clinic.DevApi.csproj
│     ├─ Dh2Clinic.DevApi.http
│     ├─ Program.cs
│     └─ Properties
│        └─ launchSettings.json
├─ DH2 Clinic Management SPA.txt
├─ package-lock.json
├─ package.json
├─ proxy.conf.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app.config.ts
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.scss
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ appointment.spec.ts
│  │  ├─ appointment.ts
│  │  ├─ core
│  │  │  ├─ auth
│  │  │  │  ├─ models
│  │  │  │  │  ├─ current-user.model.ts
│  │  │  │  │  ├─ login-request.model.ts
│  │  │  │  │  └─ login-response.model.ts
│  │  │  │  ├─ services
│  │  │  │  │  └─ auth.service.ts
│  │  │  │  └─ state
│  │  │  ├─ config
│  │  │  │  └─ api.config.ts
│  │  │  ├─ constants
│  │  │  │  ├─ api-endpoints.constants.ts
│  │  │  │  └─ http-status.constants.ts
│  │  │  ├─ guards
│  │  │  ├─ interceptors
│  │  │  │  ├─ api-error.interceptor.spec.ts
│  │  │  │  ├─ api-error.interceptor.ts
│  │  │  │  ├─ auth.interceptor.spec.ts
│  │  │  │  └─ auth.interceptor.ts
│  │  │  ├─ models
│  │  │  │  ├─ api-error.model.ts
│  │  │  │  ├─ api-response.model.ts
│  │  │  │  ├─ ApiResponse
│  │  │  │  ├─ application-error.model.ts
│  │  │  │  ├─ Authentication
│  │  │  │  ├─ LoginResponse
│  │  │  │  └─ UserSession
│  │  │  ├─ services
│  │  │  │  ├─ api.service.spec.ts
│  │  │  │  └─ api.service.ts
│  │  │  └─ utils
│  │  ├─ features
│  │  │  ├─ administration
│  │  │  ├─ appointments
│  │  │  │  ├─ appointments.routes.ts
│  │  │  │  ├─ components
│  │  │  │  │  └─ appointment-dialog
│  │  │  │  │     ├─ appointment-dialog.html
│  │  │  │  │     ├─ appointment-dialog.scss
│  │  │  │  │     └─ appointment-dialog.ts
│  │  │  │  ├─ data-access
│  │  │  │  │  ├─ models
│  │  │  │  │  │  ├─ appointment-status.enum.ts
│  │  │  │  │  │  ├─ appointment.model.ts
│  │  │  │  │  │  ├─ create-appointment.model.ts
│  │  │  │  │  │  └─ update-appointment.model.ts
│  │  │  │  │  └─ services
│  │  │  │  │     ├─ appointment-api.service.spec.ts
│  │  │  │  │     ├─ appointment-api.service.ts
│  │  │  │  │     └─ appointment.ts
│  │  │  │  ├─ models
│  │  │  │  │  └─ appointment-response.model.ts
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ appointment-details
│  │  │  │  │  │  ├─ appointment-details.html
│  │  │  │  │  │  ├─ appointment-details.scss
│  │  │  │  │  │  ├─ appointment-details.spec.ts
│  │  │  │  │  │  └─ appointment-details.ts
│  │  │  │  │  └─ appointment-list
│  │  │  │  │     ├─ appointment-list.html
│  │  │  │  │     ├─ appointment-list.scss
│  │  │  │  │     ├─ appointment-list.spec.ts
│  │  │  │  │     └─ appointment-list.ts
│  │  │  │  ├─ services
│  │  │  │  │  ├─ appointment-api.constants.ts
│  │  │  │  │  └─ appointment.service.ts
│  │  │  │  └─ state
│  │  │  │     ├─ appointment.store.spec.ts
│  │  │  │     └─ appointment.store.ts
│  │  │  ├─ auth
│  │  │  │  ├─ data-access
│  │  │  │  │  ├─ models
│  │  │  │  │  │  ├─ current-user.model.ts
│  │  │  │  │  │  ├─ login-request.model.ts
│  │  │  │  │  │  └─ login-response.model.ts
│  │  │  │  │  └─ services
│  │  │  │  │     ├─ login-api.service.spec.ts
│  │  │  │  │     └─ login-api.service.ts
│  │  │  │  ├─ guards
│  │  │  │  │  ├─ auth.guard.spec.ts
│  │  │  │  │  └─ auth.guard.ts
│  │  │  │  ├─ pages
│  │  │  │  │  └─ login
│  │  │  │  │     ├─ login.html
│  │  │  │  │     ├─ login.scss
│  │  │  │  │     ├─ login.spec.ts
│  │  │  │  │     └─ login.ts
│  │  │  │  └─ state
│  │  │  │     ├─ auth.service.spec.ts
│  │  │  │     └─ auth.service.ts
│  │  │  ├─ dashboard
│  │  │  │  └─ pages
│  │  │  │     └─ dashboard
│  │  │  │        ├─ dashboard.html
│  │  │  │        ├─ dashboard.scss
│  │  │  │        ├─ dashboard.spec.ts
│  │  │  │        └─ dashboard.ts
│  │  │  ├─ doctors
│  │  │  ├─ patients
│  │  │  │  ├─ components
│  │  │  │  │  ├─ patient-dialog
│  │  │  │  │  │  ├─ patient-dialog.html
│  │  │  │  │  │  ├─ patient-dialog.scss
│  │  │  │  │  │  ├─ patient-dialog.spec.ts
│  │  │  │  │  │  └─ patient-dialog.ts
│  │  │  │  │  └─ patient-form
│  │  │  │  │     ├─ patient-form.html
│  │  │  │  │     ├─ patient-form.scss
│  │  │  │  │     ├─ patient-form.spec.ts
│  │  │  │  │     └─ patient-form.ts
│  │  │  │  ├─ data-access
│  │  │  │  │  ├─ models
│  │  │  │  │  │  ├─ create-patient-request.model.ts
│  │  │  │  │  │  ├─ patient.model.ts
│  │  │  │  │  │  └─ update-patient-request.model.ts
│  │  │  │  │  └─ services
│  │  │  │  │     ├─ patient-api.service.spec.ts
│  │  │  │  │     ├─ patient-api.service.ts
│  │  │  │  │     └─ patient-search.service.ts
│  │  │  │  ├─ models
│  │  │  │  │  ├─ Patient
│  │  │  │  │  ├─ patient-search-result.model.ts
│  │  │  │  │  ├─ patient.model.ts
│  │  │  │  │  ├─ PatientAddress
│  │  │  │  │  └─ PatientAppointment
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ patient-details
│  │  │  │  │  │  ├─ patient-details.html
│  │  │  │  │  │  ├─ patient-details.scss
│  │  │  │  │  │  └─ patient-details.ts
│  │  │  │  │  └─ patient-list
│  │  │  │  │     ├─ patient-list.html
│  │  │  │  │     ├─ patient-list.scss
│  │  │  │  │     ├─ patient-list.spec.ts
│  │  │  │  │     └─ patient-list.ts
│  │  │  │  └─ state
│  │  │  │     ├─ patient-dialog.service.ts
│  │  │  │     ├─ patient.store.spec.ts
│  │  │  │     └─ patient.store.ts
│  │  │  └─ settings
│  │  │     └─ pages
│  │  │        └─ settings
│  │  │           ├─ settings.html
│  │  │           ├─ settings.scss
│  │  │           ├─ settings.spec.ts
│  │  │           └─ settings.ts
│  │  ├─ layout
│  │  │  ├─ breadcrumb
│  │  │  ├─ components
│  │  │  │  ├─ footer
│  │  │  │  │  ├─ footer.html
│  │  │  │  │  ├─ footer.scss
│  │  │  │  │  └─ footer.ts
│  │  │  │  ├─ header
│  │  │  │  │  ├─ header.html
│  │  │  │  │  ├─ header.scss
│  │  │  │  │  └─ header.ts
│  │  │  │  └─ sidenav
│  │  │  │     ├─ sidenav.html
│  │  │  │     ├─ sidenav.scss
│  │  │  │     └─ sidenav.ts
│  │  │  ├─ footer
│  │  │  ├─ header
│  │  │  ├─ models
│  │  │  ├─ shell
│  │  │  │  ├─ shell.html
│  │  │  │  ├─ shell.scss
│  │  │  │  └─ shell.ts
│  │  │  └─ sidenav
│  │  ├─ shared
│  │  │  ├─ components
│  │  │  │  ├─ app-toolbar
│  │  │  │  │  ├─ app-toolbar.html
│  │  │  │  │  ├─ app-toolbar.scss
│  │  │  │  │  ├─ app-toolbar.spec.ts
│  │  │  │  │  └─ app-toolbar.ts
│  │  │  │  ├─ confirmation-dialog
│  │  │  │  │  ├─ confirmation-dialog.html
│  │  │  │  │  ├─ confirmation-dialog.scss
│  │  │  │  │  ├─ confirmation-dialog.spec.ts
│  │  │  │  │  └─ confirmation-dialog.ts
│  │  │  │  ├─ data-table
│  │  │  │  │  ├─ data-table.html
│  │  │  │  │  ├─ data-table.scss
│  │  │  │  │  ├─ data-table.ts
│  │  │  │  │  └─ models
│  │  │  │  │     └─ data-table-column.model.ts
│  │  │  │  ├─ empty-state
│  │  │  │  │  ├─ empty-state.html
│  │  │  │  │  ├─ empty-state.scss
│  │  │  │  │  ├─ empty-state.spec.ts
│  │  │  │  │  └─ empty-state.ts
│  │  │  │  ├─ error-panel
│  │  │  │  │  ├─ error-panel.html
│  │  │  │  │  ├─ error-panel.scss
│  │  │  │  │  ├─ error-panel.spec.ts
│  │  │  │  │  └─ error-panel.ts
│  │  │  │  ├─ form-controls
│  │  │  │  │  ├─ date-field
│  │  │  │  │  │  ├─ date-field.html
│  │  │  │  │  │  ├─ date-field.scss
│  │  │  │  │  │  └─ date-field.ts
│  │  │  │  │  ├─ phone-field
│  │  │  │  │  │  ├─ phone-field.html
│  │  │  │  │  │  ├─ phone-field.scss
│  │  │  │  │  │  └─ phone-field.ts
│  │  │  │  │  ├─ select-field
│  │  │  │  │  │  ├─ select-field.html
│  │  │  │  │  │  ├─ select-field.scss
│  │  │  │  │  │  └─ select-field.ts
│  │  │  │  │  └─ text-field
│  │  │  │  │     ├─ text-field.html
│  │  │  │  │     ├─ text-field.scss
│  │  │  │  │     └─ text-field.ts
│  │  │  │  ├─ loading-spinner
│  │  │  │  │  ├─ loading-spinner.html
│  │  │  │  │  ├─ loading-spinner.scss
│  │  │  │  │  ├─ loading-spinner.spec.ts
│  │  │  │  │  └─ loading-spinner.ts
│  │  │  │  ├─ page-header
│  │  │  │  │  ├─ page-header.html
│  │  │  │  │  ├─ page-header.scss
│  │  │  │  │  ├─ page-header.spec.ts
│  │  │  │  │  └─ page-header.ts
│  │  │  │  └─ search-box
│  │  │  │     ├─ search-box.html
│  │  │  │     ├─ search-box.scss
│  │  │  │     ├─ search-box.spec.ts
│  │  │  │     └─ search-box.ts
│  │  │  ├─ directives
│  │  │  ├─ enums
│  │  │  ├─ interfaces
│  │  │  ├─ material
│  │  │  ├─ models
│  │  │  ├─ pipes
│  │  │  ├─ services
│  │  │  │  └─ notification.service.ts
│  │  │  ├─ styles
│  │  │  │  └─ _page-layout.scss
│  │  │  ├─ types
│  │  │  ├─ utils
│  │  │  │  └─ csv-export.util.ts
│  │  │  └─ validators
│  │  ├─ store
│  │  └─ styles
│  ├─ assets
│  │  ├─ fonts
│  │  ├─ i18n
│  │  ├─ icons
│  │  ├─ images
│  │  └─ mock-data
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  ├─ styles
│  │  ├─ base
│  │  │  ├─ _reset.scss
│  │  │  └─ _typography.scss
│  │  ├─ components
│  │  │  ├─ _buttons.scss
│  │  │  ├─ _cards.scss
│  │  │  └─ _dialogs.scss
│  │  ├─ layout
│  │  │  ├─ _footer.scss
│  │  │  ├─ _headers.scss
│  │  │  └─ _sidebar.scss
│  │  ├─ styles.scss
│  │  ├─ themes
│  │  │  ├─ _colors.scss
│  │  │  ├─ _material.scss
│  │  │  ├─ _palette.scss
│  │  │  ├─ _theme.scss
│  │  │  └─ _variables.scss
│  │  ├─ utilities
│  │  │  ├─ _helpers.scss
│  │  │  └─ _spacing.scss
│  │  ├─ vendors
│  │  ├─ _colors.scss
│  │  ├─ _helpers.scss
│  │  ├─ _mixins.scss
│  │  ├─ _reset.scss
│  │  ├─ _spacing.scss
│  │  ├─ _typography.scss
│  │  └─ _variable.scss
│  └─ styles.scss
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json
