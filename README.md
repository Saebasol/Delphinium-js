# Heliotrope API Wrapper

A TypeScript-based API wrapper for the [Heliotrope API](https://api.saebasol.org/docs), designed for both Node.js and browser environments. It uses the native Fetch API, minimizing external dependencies.

## Features

- ✅ **TypeScript First**: Strongly typed for better developer experience.
- 🚀 **Lightweight**: Uses `fetch` API, no heavy dependencies like Axios.
- 📦 **Dual Environment Support**: Works seamlessly in Node.js and modern browsers.
- 🏗️ **Modern Build**: Bundled with [tsup](https://tsup.egoist.dev/) for CJS and ESM outputs.
- 📚 **Class-based Models**: API responses are parsed into model class instances for easier handling.

## Installation

```bash
npm install @saebasol/lily
# or
yarn add @saebasol/lily
# or
pnpm add @saebasol/lily
```

(Note: The package name in npm might be different, e.g., `heliotrope-api-wrapper` if not scoped. Please adjust accordingly based on your published package name.)

## Usage

First, import the `HeliotropeClient` and any necessary types/models from the library.

```typescript
import {
  HeliotropeClient,
  HeliotropeClientOptions,
  GalleryInfo, // Example model for gallery details
  Info,        // Example model for general info
  List,        // Example model for lists of info
  HeliotropeError // Custom error class
} from '@saebasol/lily'; // Adjust package name if necessary

// Configure the client
const options: HeliotropeClientOptions = {
  baseURL: 'https://your-heliotrope-api-proxy.com/api' // Replace with your actual API base URL or proxy
};

const client = new HeliotropeClient(options);

// Example: Fetching gallery information
async function fetchGallery(galleryId: number) {
  try {
    const galleryInfo: GalleryInfo = await client.hitomi.getGalleryInfo({ id: galleryId });
    console.log('Gallery Title:', galleryInfo.title);
    console.log('Artists:', galleryInfo.artists.map(artist => artist.name).join(', '));
    // galleryInfo is an instance of GalleryInfo class, explore its properties
    // e.g., galleryInfo.tags, galleryInfo.files, galleryInfo.date etc.
    return galleryInfo;
  } catch (error) {
    if (error instanceof HeliotropeError) {
      console.error('Heliotrope API Error:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

// Example: Searching for items
async function searchItems(tags: string[], offset: number = 0) {
  try {
    // Assuming RawSearchRequestData for the body is { query: string[], offset: number }
    const searchResult: List = await client.hitomi.postSearch({ query: tags, offset });
    console.log(`Found ${searchResult.count} items. Displaying page based on offset.`);
    searchResult.result.forEach(item => {
      console.log('- ', item.title);
    });
    return searchResult;
  } catch (error) {
    if (error instanceof HeliotropeError) {
      console.error('Heliotrope API Error during search:', error.message);
    } else {
      console.error('An unexpected error occurred during search:', error);
    }
  }
}

// --- Using the functions ---
async function main() {
  const exampleGalleryId = 1234;
  console.log(`Fetching gallery with ID: ${exampleGalleryId}`);
  const gallery = await fetchGallery(exampleGalleryId);
  if (gallery) {
    // Do something with gallery data
  }

  console.log('\nSearching for items with tag: lang:korean');
  const searchResults = await searchItems(['lang:korean', 'type:manga']);
  if (searchResults) {
    // Do something with search results
  }

  // Other available methods on client.hitomi:
  // client.hitomi.getInfo({ id: number }): Promise<Info>
  // client.hitomi.getList({ index: number }): Promise<List>
  // client.hitomi.postRandom({ query: string[] }): Promise<Info>
  // client.hitomi.getImage({ id: number }): Promise<Image> (Note: Image model might need specific handling for binary data or image URLs)
}

main().catch(console.error);

### Using with AbortController

All `async` methods in the services accept an optional `abortSignal` parameter from an `AbortController` to cancel requests.

```typescript
async function fetchWithTimeout(galleryId: number, timeoutMs: number = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    console.log(`Fetching gallery (ID: ${galleryId}) with ${timeoutMs}ms timeout...`);
    const galleryInfo = await client.hitomi.getGalleryInfo({ id: galleryId, abortSignal: controller.signal });
    console.log('Fetched:', galleryInfo.title);
    return galleryInfo;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Request timed out or was aborted.');
    } else if (error instanceof HeliotropeError) {
      console.error('Heliotrope API Error:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

// fetchWithTimeout(1234);
```

## API Documentation

This wrapper is based on the official Heliotrope API documentation:
[https://api.saebasol.org/docs](https://api.saebasol.org/docs) (Link to the general docs page)

(You might want to link directly to the OpenAPI/Swagger JSON if that's more appropriate: `https://api.saebasol.org/docs/openapi.json`)