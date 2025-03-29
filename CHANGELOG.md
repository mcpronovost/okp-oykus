# Changelog

All notable changes to this project will be documented in this file.

## [v0.2.1] - 2025-03-29

### Added

- Add forum topic creation functionality with corresponding serializer and view
- Add onClick handler to OkpFormReset component
- Add breadcrumb and actions to forum section and topic pages
- Add okpScrollTo utility function
- Add OkpButton component
- Add statistics fields to OkpUser model and update admin interface
- Add statistics fields to OkpGameCharacter model and update admin interface
- Add initial values to OkpForm
- Add forum post components and styles, including post list and post card, and integrate new form for creating posts
- Add card component and integrate it into the forum topic card
- Add themes fixture and include it in the migration process
- Add forum components and styles, including breadcrumb and heading, and update game layout
- Add game layout component and styles, update routing and translations
- Add side game layout styles and integrate side game component into the main layout
- Add InitDataProvider to manage side games data and integrate it into OkpProviders component
- Add disabled state handling to OkpLink component
- Add okpEncode and okpDecode utility functions to API service and update imports in Auth service
- Add colour manipulation utilities and enhance OkpAvatar component to support custom background and text colours
- Add game API endpoints and views for popular games
- Add is_active and is_public fields to OkpGame model
- Add user abbreviation and update avatar handling in OkpAuthMeView and SideCore components
- Add AuthProvider to Providers component, update header to conditionally render login/signup
- Add Login and Logout components with routing integration
- Add theme handling and initial data retrieval to OkpProviders and App components, enhancing styling and functionality
- Add SEO and theme handling to OkpPageView, including page title and description methods
- Add site icon and favicon configurations to UNFOLD settings, and include new image files for icons.
- Add color palette configuration to UNFOLD settings
- Add 'is_pinned' and 'is_important' fields to OkpForumTopic model, update serializers and UI components to support new topic features.
- Add 'is_locked' field to OkpForumTopic model and update related components for topic locking functionality
- Add fields for colour, cover, and last post visibility to OkpForumSection model and update related serializers and admin interface.

### Refactored

- Refactor forum statistics updates to handle both post_save and post_delete signals for topics and posts, including character and user statistics.
- Refactor forum URL generation and enhance topic card and list components with new styles and structure
- Refactor component loading in App.jsx to use lazy loading and update main.jsx to pass data prop to OkpProviders
- Refactor route components to remove lazy loading
- Refactor OkpPageView to conditionally retrieve and serialize object data, enhancing context preparation for SEO and theme handling
- Refactor API handling by replacing useAuthApi with okpApi, streamline component loading, and enhance error handling in App and Providers components.
- Refactor authentication components and styles, enhance user data handling, and integrate translations for improved user experience.
- Refactor frontend design library from radix to antd
- Refactor layout components by introducing OkpLayout and OkpSideCore, enhancing structure and usability.
- Refactor OkpScrollarea to conditionally render scrollbars based on enableHorizontal and enableVertical props
- Refactor OkpForumTopic component to include reply form

### Fixed

- Fix inputType text

### Changed

- Update translations
- Update topicCard banner opacity
- Update default background and shadow colours in Providers component
- Update
- Update breadcrumb font size
- Enhance OkpForumPostAdmin with additional filters and update post creation to associate the current user.
- Clean
- Update forum post creation to require authentication and enhance validation for topic and character ownership
- Update NewPost component to use user characters dynamically
- Display user characters dynamically
- Update GameCharacter serializer
- Alter colour fields in OkpGameTheme model to allow blank and null values
- Update game theme
- Temporarly enable overflow scrollbar on scrollarea
- Update header styles for mobile responsiveness and standardise translation keys for user profile labels
- Modify hover effect for links to exclude disabled elements
- Replace TemplateView with OkpView in URL routing
- Delete session and CSRF cookies upon user logout in OkpAuthLogoutView and OkpAuthLogoutAllView
- Integrate OkpUserSerializer to streamline user data handling in authentication responses
- Update auth to update logged in user after some times
- Reorganise Providers component structure, update API language handling, and clean up AuthProvider
- Enhance header styles with hover and active opacity effects, improve link routing logic, and refactor router utilities for better path handling.
- Update App, main and Providers components to integrate OkpErrorBoundary for improved error handling and update routing logic for better language support
- Update theme handling in OkpPageView to return JSON formatted themes
- Enhance OkpBanner component with additional props for fade, radius, opacity, and blur effects, improving styling flexibility
- Update package.json to include new dependencies '@ant-design/v5-patch-for-react-19' and 'antd', and upgrade 'lucide-react' to version 0.483.0
- Replace data reload with OkpError component in OkpGameLayout for better error handling.
- Update index.html to set default language to French and add meta description for improved SEO.
- Enhance button and card ui components with new styles and loading states
- Update colours
- Update forum fixtures with new statistics fields, and implement UI components for buttons and empty states.
- Update OkpForumTopic to automatically update related statistics on save and delete

### Removed

- Remove negative margin on ant-card-cover
- Remove async keyword on loadTranslations

### Updated

- Bump pylint from 3.3.4 to 3.3.6 in /oykus/backend
- Bump tzdata from 2025.1 to 2025.2 in /oykus/backend
- Bump platformdirs from 4.3.6 to 4.3.7 in /oykus/backend
- Bump iniconfig from 2.0.0 to 2.1.0 in /oykus/backend
- Bump django-unfold from 0.52.0 to 0.53.0 in /oykus/backend
- Bump django from 5.1.6 to 5.1.7 in /oykus/backend
- Bump coverage from 7.6.12 to 7.7.0 in /oykus/backend
- Bump astroid from 3.3.8 to 3.3.9 in /oykus/backend
- Bump django-unfold from 0.51.0 to 0.52.0 in /oykus/backend
- Bump globals from 15.15.0 to 16.0.0 in /oykus/frontend
- Bump attrs from 25.1.0 to 25.3.0 in /oykus/backend

**Full Changelog**: https://github.com/mcpronovost/okp-oykus/compare/v0.2.0...v0.2.1

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
