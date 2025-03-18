# Changelog

All notable changes to this project will be documented in this file.

## [v0.2.0] - 2025-03-18

### Added

- Add breadcrumb to category serializer and update related components
- Add django-colorfield
- Add OkpGameUserAuthorSerializer and update imports in forum serializers
- Add OkpLink component for improved navigation consistency
- Add footer to OkpGameLayout
- Add breadcrumb functionality to forum models and serializers
- Add OkpForumTopicPostSerializer and update serializers for forum posts
- Add lucide-react
- Add user and character fields to OkpForumTopic model and update related serializers
- Add forum topic and list styles, and update component structure
- Add game and forum components with initial data handling
- Add forum game routing and statistics management
- Add OkpPageView for dynamic context handling
- Add forum topic and post management features
- Add OkpErrorBoundary component for error handling in App
- Add navigation structure for admin interface
- Add initial forum module with models, admin interfaces, and migrations
- Add initial game module with models, admin, and configuration
- Add OkpOrderableMixin model for order management
- Add superuser creation and initial fixtures
- Add Radix UI themes and update styles
- Add OkpProviders component to wrap the App with RouterProvider
- Implement router context and utility functions for navigation and localization
- Add django-unfold to requirements and configure Unfold settings

### Refactored

- Refactor template and settings for improved frontend integration
- Refactor data handling in game components to improve robustness
- Refactor forum components for game integration
- Refactor forum admin and model structures for improved title handling
- Refactor internationalization and routing components
- Refactor forum module to replace 'Message' with 'Post'
- Refactor form components and update styles
- Refactor App component to use dynamic routing with lazy loading and Loading component
- Refactor frontend from Expo to Vite

### Changed

- Update category components
- Update game admin and models, add OkpGameTheme support
- Update OkpBanner style
- Update lastpost button style
- Update topic ordering and format serializer fields
- Update i18n context to include language in provider value.
- Update serializers to include read-only fields and enhance game model relationships
- Update forum fixtures and enhance UI components
- Update fixtures
- Update "go to last post" button style
- Clean
- Enhance OkpAvatar component and styles
- Update URL handling in OkpTopic component to use replaceState for better navigation
- Update OkpOrderableMixin to enforce order field constraints and improve order assignment logic
- Update forum API views and pagination system
- Update forum and game modules with new features and improvements
- Enhance forum module with new post management features
- Update styles and structure of Topic component
- Update HTML language to French and change title to 'Oykus', modify root div ID to 'okp'
- Change HTML language attribute to French and update root div ID to 'okp'
- Update .gitignore to specify backend data directory path
- Enhance routing and navigation with new screens and components

### Updated

- Bump isort from 6.0.0 to 6.0.1 in /oykus/backend
- Bump rpds-py from 0.22.3 to 0.23.1 in /oykus/backend
- Bump pytest from 8.3.4 to 8.3.5 in /oykus/backend

**Full Changelog**: https://github.com/mcpronovost/okp-oykus/compare/v0.1.4...v0.2.0

## [v0.1.4] - 2025-02-22

### Added

- Implement custom routing system for frontend
- Add base HTML and robots.txt for frontend
- Implement custom routing service

### Refactored

- Refactor Notifications component with interactive state management
- Refactor LeftPanel menu rendering and styling
- Refactor Header components and styles
- Refactor Icon component to use MaterialCommunityIcons

### Changed

- Enhance routing and navigation in frontend layout
- Create basic Error404 screen
- Update LeftPanel icons and styling
- Configure Expo build and development settings

### Removed

- Remove webpack configuration for Expo frontend
- Remove custom router service and simplify app initialization

**Full Changelog**: https://github.com/mcpronovost/okp-oykus/compare/v0.1.3...v0.1.4

## [v0.1.3] - 2025-02-20

### Added

- Implement right panel styling and component

### Refactored

- Refactor font handling and text component styling
- Refactor frontend dependencies and improve app configuration

### Changed

- Improve frontend development and assets routing
- Enhance responsive design and add Nunito font support
- Improve cross-platform icon and layout compatibility
- Enhance frontend layout with responsive design and new components
- Migrate frontend to React Native and Expo
- Update .gitignore
- Update frontend styling with Nunito font and colour scheme

### Removed

- Remove fonts
- Remove old frontend

### Updated

- Bump flake8 from 7.1.1 to 7.1.2 in /oykus/backend

**Full Changelog**: https://github.com/mcpronovost/okp-oykus/compare/v0.1.2...v0.1.3

## [v0.1.2] - 2025-02-17

### Added

- Implement layout structure with header, panels, and styling
- Add Loading component with styling and variants
- Add Alert component with styling and variants

### Changed

- Set default HTML language to English

### Updated

- Bump okp-i18n and okp-router

**Full Changelog**: https://github.com/mcpronovost/okp-oykus/compare/v0.1.1...v0.1.2

## [v0.1.1] - 2025-02-16

### Added

- Add devserver script

### Fixed

- Fix initializations

### Updated

- Bump coverage from 7.6.11 to 7.6.12 in /oykus/backend
- Bump pytest-django from 4.9.0 to 4.10.0 in /oykus/backend

### Initial

- Initial frontend
- Initial backend

**Full Changelog**: https://github.com/mcpronovost/okp-oykus/compare/v0.1.0...v0.1.1

## [v0.1.0] - 2025-02-16

### Initial

- Initial commit

---

### License

This project is licensed under the [BSD-3-Clause License](LICENSE).

### Contributing
We welcome contributions! Please check out our [Contributing Guide](CONTRIBUTING.md) for details on how you can help.

https://github.com/mcpronovost/okp-oykus

Thanks :)
