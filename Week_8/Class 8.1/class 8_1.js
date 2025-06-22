// Tailwind Class

// 1. Flex


// Flex lets you position elements right next to each other.
// Flexbox is a layout system used to arrange items in a row or column, and align them how you want.

// Note: By default, flex items are aligned to the start of the flex container.

// Flex ensured that the divs are aligned right next to each other. Without flex, divs are placed one below the other. This is because div is a block element by default, which means it takes up the full width of its parent container and starts on a new line. Flexbox changes this behavior, allowing elements to be laid out in a row or column, depending on the flex direction.



// Open up App.jsx of tailwind-prac/src for understanding

// justifyContent

// justifyContent: center; // Center the items in the flex container
// justifyContent: space-between; // Space between the items in the flex container
// justifyContent: space-around; // Space around the items in the flex container
// justifyContent: space-evenly; // Space evenly between the items in the flex container
// justifyContent: flex-start; // Align items to the start of the flex container
// justifyContent: flex-end; // Align items to the end of the flex container


// Tailwind - A css framework.
// Step 1: Install tailwindcss for vite from its docs
// <div className='flex justify-between'></div>

// So we provide classNames to apply styles using tailwind.

// you start it with:
// <div class="flex"> ... </div>

// 🔄 Flex Direction
// Use these to choose the direction of items:

// flex-row	(default) → items go left to right
// flex-col	-> items go top to bottom

// gap-* -> adds space between items in a flex container.
// <div class="flex gap-4"></div>

// 🧭 Align Items
// Align horizontally (main axis):
// Class	Meaning
// justify-start	Left/start aligned
// justify-center	Centered
// justify-end	Right aligned
// justify-between	Spread out

// Align vertically (cross axis):
// Class	Meaning
// items-start	Top aligned
// items-center	Vertically centered
// items-end	Bottom aligned


// 2. Grids

// A grid is a layout system that helps you place items in rows and columns — like a table, but for any kind of content.

// To start using grid layout on a container:
// <div class="grid"> ... </div>

// Use grid-cols-* to set number of columns:
// <div class="grid grid-cols-3"></div>
// ➡️ This creates 3 equal-width columns.

// Use col-span-* to control how many columns an item takes up:
// <div class="grid grid-cols-3">
//   <div class="col-span-2">This takes 2 columns</div>
//   <div class="col-span-1">This takes 1 column</div>



// 🎯 Rule of Thumb:
// 🟦 Use flex when items are in one direction (row/column), and you care about alignment and spacing.e.g., items in a row/column, centering content, navbar.

// 🟥 Use grid when you need to control both directions (rows + columns), or want a clean, structured layout. e.g., equal-width cards in rows, complex layout (rows+cols), fixed number of cols.





// 3. Responsiveness

// use the breakpoint-tailwind image to understand how to use breakpoints in tailwind

// Tailwind uses a mobile-first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.


// What this means is that unprefixed utilities (like uppercase) take effect on all screen sizes, while prefixed utilities (like md:uppercase) only take effect at the specified breakpoint and above.


// Above line is very important. Also understand what is meant by "above" in the last line.

// Don't use sm: to target mobile devices

// <!-- This will only center text on screens 640px and wider, not on small screens -->
// <div class="sm:text-center"></div>

// Use unprefixed utilities to target mobile, and override them at larger breakpoints

// <!-- This will center text on mobile, and left align it on screens 640px and wider -->
// <div class="text-center sm:text-left"></div>


// Breakpoint prefix	Minimum width	CSS
// sm	40rem (640px)	@media (width >= 40rem) { ... }
// md	48rem (768px)	@media (width >= 48rem) { ... }
// lg	64rem (1024px)	@media (width >= 64rem) { ... }
// xl	80rem (1280px)	@media (width >= 80rem) { ... }
// 2xl	96rem (1536px)  @media (width >= 96rem) { ... }


// Now we try to complete the Dukaan assignment.
// Refer to App.jsx and components folder of tailwind-prac/src for the assignment.

// items-center is a utility class used to align items along the cross axis (usually vertically) in a flex container.
// You use items-center on a parent container that has flex layout, to vertically center its children (when flex-row is used).
// Refer to the flexbox axes image to understand the concept of axes in different flex directions.





// PART - 2

// Storybook - A tool for developing UI components in isolation for React, Vue, and Angular. It does not requir you to run the full app.
// It is helpful when we don't want to open source the complete codebase, but want to share the components with others.

// Storybook is a place where we can look at all the components. It allows us to develop stories for each component, which are basically different states of the component. For example, a button can have different states like primary, secondary, disabled, etc. Storybook allows us to develop these states in isolation, without having to run the complete application.

// Story - A story is an example of how a component should look or behave.

// Each story is like:
// ➡️ “Here’s how the Button component looks when it’s red and disabled.”
// ➡️ “Here’s how the Card component looks with a title and image.”

// Storybook = a photo album of all your UI parts.

// Each Story = a single photo showing how one part looks.

// Razorpay uses storybook in razorpay blade, which is their design system.







// PART -3 

// MUI - Material UI is a popular React component library that provides pre-designed components following Google's Material Design guidelines. It is highly opinionated and comes with a lot of built-in styles and themes. It is great for building applications quickly, but it can be difficult to customize the styles to match your own design system.

// It is very difficult to override the styles of MUI components, as they are very opinionated. It is easy and quick to use those MUI components, but you may find it challenging to make them fit your specific design needs.
// On the other hand, Tailwind is very verbose and requires you to write a lot of classes, but it gives you complete control over the styles. You can easily customize the styles to match your own design system, and it is very easy to override the styles of Tailwind components.

// Vercel uses Tailwind, shadcn and Radix UI to build their components.