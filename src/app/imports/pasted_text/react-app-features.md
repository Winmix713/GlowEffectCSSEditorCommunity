You are a React developer working on enhancing a web application. Your task is to implement the following features systematically, ensuring best practices and clean code architecture:

**Required Implementation Tasks:**

1. **Routing System Setup**
   - Implement React Router for multi-page navigation
   - Create at least 3-4 distinct routes (e.g., Home, About, Products, Contact)
   - Include nested routing if applicable
   - Add navigation components with active link styling
   - Implement 404 error page for invalid routes

2. **Global State Management**
   - Choose and implement either Context API or Zustand for state management
   - Create a centralized store for application-wide data
   - Implement state actions for common operations (CRUD operations, user authentication, etc.)
   - Ensure proper state persistence where needed

3. **Error Boundary Implementation**
   - Create a comprehensive Error Boundary component
   - Include fallback UI with user-friendly error messages
   - Add error logging functionality
   - Implement error recovery mechanisms where possible

4. **Loading State Management**
   - Implement loading indicators for application initialization
   - Add skeleton screens or spinners for data fetching operations
   - Create reusable loading components
   - Handle different loading states (initial load, data refresh, form submission)

5. **SEO Optimization (for SSR scenarios)**
   - Implement dynamic meta tags using React Helmet or similar
   - Add Open Graph and Twitter Card meta tags
   - Include structured data markup where relevant
   - Ensure proper title and description tags for each route

**Deliverables:**
- Clean, well-documented code following React best practices
- Responsive design considerations
- TypeScript implementation (if applicable)
- Basic testing setup for critical components
- README documentation explaining the implementation choices

Prioritize code maintainability, performance, and user experience in your implementation.

- [ ] Implement routing (React Router) to support multiple pages
- [ ] Global state management (Context API or Zustand)
- [ ] Add error boundary for error handling
- [ ] Implement loading state for loading the application
- [ ] Embed SEO meta tags (when used with SSR)

----------------------------------------------
You are a frontend developer working on a CSS glow effect generator application. Your task is to implement the following features in order of priority:

**Required Features to Implement:**

1. **Undo/Redo Functionality**
   - Implement a history stack that tracks all user actions
   - Provide undo (Ctrl+Z) and redo (Ctrl+Y) capabilities
   - Maintain a reasonable history limit (e.g., 50 actions)

2. **Preset System**
   - Create save/load functionality for glow effect presets
   - Allow users to name and organize their saved presets
   - Include a few built-in default presets

3. **Export Functionality**
   - Enable export in multiple formats: CSS code, JSON configuration, and PNG/SVG image
   - Provide copy-to-clipboard options for code exports
   - Ensure exported CSS is clean and production-ready

4. **Local Storage Persistence**
   - Automatically save the current application state to browser local storage
   - Restore the last session when the user returns to the application
   - Handle storage quota limits gracefully

5. **Keyboard Shortcuts**
   - Implement common shortcuts: Ctrl+S (save preset), Ctrl+Z (undo), Ctrl+Y (redo)
   - Display available shortcuts in a help menu or tooltip
   - Ensure shortcuts don't conflict with browser defaults

6. **Multi-layer Support**
   - Allow users to create and manage multiple glow layers simultaneously
   - Provide layer ordering, visibility toggles, and individual layer controls
   - Show a clear visual representation of the layer stack

7. **Animation Timeline**
   - Create a timeline interface for animating glow properties over time
   - Support keyframe-based animations with easing options
   - Generate CSS animations or JavaScript-based animations as output

**Technical Requirements:**
- Use modern JavaScript (ES6+) and ensure cross-browser compatibility
- Implement proper error handling and user feedback
- Follow accessibility best practices
- Write clean, maintainable, and well-documented code
- Consider performance implications, especially for real-time preview updates

**Deliverables:**
For each feature, provide the complete implementation including HTML structure, CSS styling, and JavaScript functionality. Include brief documentation explaining how each feature works and any important implementation decisions.

[ ] Add Undo/Redo functionality (history stack)
- [ ] Implement preset system (save/load)
- [ ] Export functionality (CSS, JSON, as image)
- [ ] Local Storage persistence for state
- [ ] Support for keyboard shortcuts (e.g. Ctrl+S to save)
- [ ] Multi-layer support (multiple glow layers at once)
- [ ] Animation timeline for glow changes
-----------------------------------
You are a senior frontend developer with expertise in CSS tools and web application architecture. You are tasked with creating a comprehensive implementation roadmap for a CSS glow effect generator tool.

**Your Task**: Analyze the provided feature list and create a detailed implementation strategy that balances user value, technical feasibility, and development resources.

**Tool Context**: 
- Web-based CSS glow effect generator with real-time preview
- Target users: Web developers, designers, and CSS enthusiasts
- Must be performant, intuitive, and provide professional export capabilities
- Built with modern web technologies (assume React/Vue + Canvas/WebGL)

**Required Analysis Framework**:

1. **Feature Categorization**: Group features into logical categories:
   - Core Functionality
   - User Experience & Interface
   - Performance & Optimization
   - Export & Integration
   - Advanced Features

2. **Priority Assessment**: Rank each feature using these criteria:
   - **User Impact**: How much value does this provide to end users?
   - **Implementation Effort**: Development time and complexity (1-5 scale)
   - **Dependencies**: What other features must be completed first?
   - **Technical Risk**: Potential implementation challenges
   
   Use priority indicators: 🔴 High, 🟡 Medium, 🟢 Low

3. **Development Phases**: Organize into 3 phases:
   - **Phase 1** (MVP - 4-6 weeks): Essential features for launch
   - **Phase 2** (Enhancement - 6-8 weeks): User experience improvements
   - **Phase 3** (Advanced - 8-10 weeks): Professional and power-user features

4. **Technical Implementation Details**: For each high-priority feature, include:
   - Recommended technical approach
   - Key implementation challenges
   - Required libraries/dependencies
   - Performance considerations

5. **Success Metrics**: Define measurable outcomes for each phase

**Feature List to Analyze**:
- Collapsible sections state saving
- Preset selector dropdown
- Real-time CSS code syntax highlighting
- Export button with separate modal (multiple formats)
- Keyboard input support for slider values
- Range lock function (parameter linking)
- A/B comparison between two settings
- History browser for undo/redo
- Screenshot export functionality
- Multiple frame size support (tablet, desktop)
- Grid overlay for position fine-tuning
- Drag & drop for glow position setting
- Real-time performance metrics display
- Canvas-based rendering for better performance
- Video export (animated glow changes)
- Split view (before/after comparison)
- Lazy loading implementation
- Retry mechanism
- Loading skeleton/spinner animation
- Progressive image loading (blur-up technique)
- WebP format support with detection
- Image optimization cache layer
- Error reporting with analytics integration

**Output Requirements**:
- Use structured markdown format with clear headings
- Include priority indicators for each feature
- Provide estimated effort (person-days) for high-priority items
- Present information in scannable, decision-ready format
- Focus on actionable insights for development planning

**Constraints**:
- Assume a team of 2-3 frontend developers
- Target modern browsers (ES6+, no IE support needed)
- Budget for 18-20 weeks total development time
- Prioritize features that differentiate from existing CSS generators




- [ ] Save collapsible section state
- [ ] Add preset selector dropdown
- [ ] Real-time CSS code syntax highlighting
- [ ] Export button with separate modal (multiple formats)
- [ ] Keyboard input support for slider values
- [ ] Range lock function (linking parameters)
- [ ] A/B comparison between two settings
- [ ] History browser for undo/redo
- [ ] Screenshot export functionality
- [ ] Support for multiple frame sizes (tablet, desktop)
- [ ] Add grid overlay for fine-tuning position
- [ ] Drag & drop for adjusting glow position
- [ ] Show real-time performance metrics
- [ ] Canvas-based rendering for better performance
- [ ] Video export (animated glow changes)
- [ ] Split view (before/after comparison)
- [ ] Implement lazy loading
- [ ] Add retry mechanism
- [ ] Loading skeleton/spinner animation
- [ ] Progressive image loading (blur-up technique)
- [ ] WebP format support with detection
- [ ] Image optimization cache layer
- [ ] Error reporting with analytics integration