import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hazeberg-consulting/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        careers: 'public/careers.html'
      },
      // Copy blog files to dist after build
      generateBundle() {
        // This will run after the build
        const blogDir = 'blog';
        const distBlogDir = 'dist/blog';
        
        // Create blog directory in dist if it doesn't exist
        if (!existsSync(distBlogDir)) {
          mkdirSync(distBlogDir, { recursive: true });
        }
        
        // Copy blog HTML files
        const blogFiles = [
          'digital-transformation-2024.html',
          'workday-implementation-guide.html',
          'cloud-migration-strategies.html',
          'shared-blog-styles.css'
        ];
        
        blogFiles.forEach(file => {
          try {
            copyFileSync(`${blogDir}/${file}`, `${distBlogDir}/${file}`);
          } catch (error) {
            console.warn(`Could not copy ${file}:`, error);
          }
        });
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Ensure static assets are copied
  publicDir: 'public',
  assetsInclude: ['**/*.html', '**/*.css']
});
