# react-web3-hook

> Web3 hook for react

[![NPM](https://img.shields.io/npm/v/react-web3-hook.svg)](https://www.npmjs.com/package/react-web3-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-web3-hook

OR

yarn add react-web3-hook
```

## Usage

App.tsx
```tsx

import { Web3Container } from 'react-web3-hook';

const App = () => {
  return (
    <Web3Container >
      {...}
    </Web3Container>
  );
};

export default App;
```

web3 hook
```tsx

const {
  isLoaded,
  isWeb3,
  accounts,
  network,
  networkId,
  explorerUrl,
  currentAddress,web3,error
  } = useWeb3()
```

## License

MIT © [z3r0c00l-2k](https://github.com/z3r0c00l-2k)
