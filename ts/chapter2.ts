const chapter2 = new Chapter('Types, variables, functions', 2, '59 - 94');

createChapter(chapter2, () => {
  test('basic types', 62, () => {
    const add = (a: number, b: number): number => {
      return a + b;
    };

    const addArray = (arr: number[]): number => {
      return arr.reduce((sum, now) => sum + now, 0);
    };
    log('Adding:', add(3, 4));
    log('AddingArray:', addArray([3, 23, 323, 32]));
  });

  test('forOf', 68, () => {
    const arr = ['lol', 'boo', 'rar'];
    for (const text of arr) {
      log(text);
    }
  });

  test('forIn', 68, () => {
    const arr = ['lol', 'boo', 'rar'];
    for (const i in arr) {
      log(arr[i]);
    }
  });
  test('enum', 71, () => {
    enum CarStates {
      stopped,
      running,
      crushed,
    }
    let carStatus: CarStates = CarStates.stopped;
    log('car is', CarStates[carStatus], carStatus);
    carStatus = CarStates.running;
    log('car is', CarStates[carStatus], carStatus);
    carStatus = CarStates.crushed;
    log('car is', CarStates[carStatus], carStatus);
  });

  test('const enum', 73, () => {
    const enum CarStates {
      stopped = 'stopped', // ? if without value
      running = 'running', // ? enum will use numbers ex. stopped = 0, running = 1, crushed = 2
      crushed = 'crushed',
    }
    let carStatus: CarStates = CarStates.stopped;
    logImportant(
      `better optimization than normal enum because it won't use function handler, it will remove enum declaration and replace const enum with values only`
    );
    log('car is', carStatus);
    carStatus = CarStates.running;
    log('car is', carStatus);
    carStatus = CarStates.crushed;
    log('car is', carStatus);
  });

  testGroup('? and ...', '78 - 82', () => {
    test('?', 78, () => {
      const textGen = (a: string, b?: string): string => {
        if (b) {
          return a + b;
        }
        return a;
      };
      logImportant(`'?' make parameter optional`);
      log('Without b', textGen('fish'));
      log('With a and b', textGen('fish', ' is alive'));
    });

    test('...', 81, () => {
      const add = (...value: number[]): number => {
        return value.reduce((sum, add) => sum + add, 0);
      };
      logImportant(
        `'...' allow us to add as many parameters as we like`
      );
      log('Add: 2, 3', add(2, 3));
      log('Add: 23, 32, 43, 54, 65, 2', add(23, 32, 43, 54, 65, 2));
    });
  });

  test('Callback function', 84, () => {
    const msg = (info: string, callback: (text: string) => void): void => {
      callback(info);
    };
    msg(
      'wow callback is working use: callback: (text: string) => void as function parameter',
      log
    );
  });

  test('Overload function', 86, () => {
    function add(a: number, b: number): number;
    function add(a: string, b: string): string;
    function add(a: number | string, b: number | string): number | string {
      if (typeof a === 'string' && typeof b === 'string') {
        log(a + b);
        return a + b;
      } else if (typeof a === 'number' && typeof b === 'number') {
        log(a + b);
        return a + b;
      }
      return 0;
    }
    log('add(2, 5)');
    add(2, 5);
    log('add("rob ","bob")');
    add('rob ', 'bob');
    logWarning(
      'add(2,"bob")',
      'not valid declaration',
      'can use only declared types',
      '(a: number, b: number) or (a: string, b: string)'
    );
    // ! not valid add(2, 'bob')
  });

  testGroup('Advanced types', '87 - 94', () => {
    test('string | number OR union type', 88, () => {
      const addAsText = (a: string | number, b: string | number): string => {
        return a.toString() + b.toString();
      };
      log(
        'const addAsText = (a: string | number, b: string | number)',
        "addAsText(34, ' bobi')",
        addAsText(34, ' bobi')
      );
    });

    test('Type guard OR typeof', 89, () => {
      const cakeWithCandles = (
        cake: string,
        candles: string | number
      ): string => {
        if (typeof candles === 'string') {
          return `${cake} with ${candles}`;
        }
        // if (typeof candles === 'number')
        return `${cake} with ${candles} candles`;
      };
      log(
        'cakeWithCandles = (cake: string, candles: string | number ): string',
        "cakeWithCandles('apple pie', 'pink candles')",
        cakeWithCandles('apple pie', 'pink candles')
      );
      log("cakeWithCandles('apple pie', 15)", cakeWithCandles('apple pie', 15));
    });
 
    test('Type alias', 90, () => {
      type candle = string | number;
      const cakeWithCandles = (cake: string, candles: candle): string => {
        if (typeof candles === 'string') {
          return `${cake} with ${candles}`;
        }
        // if (typeof candles === 'number')
        return `${cake} with ${candles} candles`;
      };
      logImportant('type candle = string | number');
      log(
        'cakeWithCandles = (cake: string, candles: string | number ): string',
        "cakeWithCandles('apple pie', 'pink candles')",
        cakeWithCandles('apple pie', 'pink candles')
      );
      log("cakeWithCandles('apple pie', 15)", cakeWithCandles('apple pie', 15));
    });
  });
});
