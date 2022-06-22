run:
	tsc && tsc index.ts --esModuleInterop && node index.js

build:
	tsc index.ts --esModuleInterop && node index.js