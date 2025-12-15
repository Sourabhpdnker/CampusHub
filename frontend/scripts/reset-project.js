#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the /app directory to /app-example and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const oldAppPath = path.join(root, 'app');
const newAppPath = path.join(root, 'app-example');
const newAppDir = path.join(root, 'app');

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;

fs.rename(oldAppPath, newAppPath, (error) => {
  if (error) {
    return console.error(`Error renaming app directory: ${error}`);
  }

  fs.mkdir(newAppDir, { recursive: true }, (error) => {
    if (error) {
      return console.error(`Error creating new app directory: ${error}`);
    }

    fs.writeFileSync(path.join(newAppDir, 'index.tsx'), indexContent);
    fs.writeFileSync(path.join(newAppDir, '_layout.tsx'), layoutContent);

    console.log(
      '✅ Successfully reset the project to a blank state.\n\n⚠️  Original app directory moved to /app-example. You can delete this directory if you don\'t need it.'
    );
  });
});