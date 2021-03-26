const chapter4 = new Chapter(
  'Decorators, Generic types and Async',
  4,
  '130 - 165'
);
createChapter(chapter4, () => {
  testGroup('Decorators', '130 - 143', () => {
    logWarning('You have to enable "experimentalDecorators" in tsconfig.json');
    logImportant(
      'Decorators are used for updating classes without braking old code'
    );
    test('Decorators with variables', '130 - 134', () => {
      const decoratorFactory = (msg: string, tell: string) =>
        function decorator(constructor: Function) {
          log(tell);
          constructor.prototype.msg = msg;
        };
      function decoratorWithoutVariables(constructor: Function) {
        log('Without variables there is no need for factory function wrapper');
      }

      @decoratorWithoutVariables
      @decoratorFactory(
        'Wow i working',
        'Remember in which direction decorators are run'
      )
      class decoratedClass {
        constructor() {
          log('new Class constructed');
        }
      }
      logWarning(
        'Decorator are run only on creation of definition of the class'
      );

      const dec1 = new decoratedClass();
      log('(<any>dec1).msg', 'It have to be typeof <any>', (<any>dec1).msg);
      const dec2 = new decoratedClass();
      log('(<any>dec1).msg', 'It have to be typeof <any>', (<any>dec2).msg);
    });
    test('Decorators of property', '135 - 136', () => {
      function decoratorForVariables(target: any, propertyKey: string) {
        let targetName: string;
        let isStatic = false;
        if (typeof target === 'function') {
          // ? handle static property differences from typical one
          targetName = target.name;
          isStatic = true;
        } else {
          targetName = target.constructor.name;
        }
        log(
          `Targeting ${targetName} class with ${
            isStatic ? 'static' : ''
          } property named ${propertyKey}`
        );
      }

      class decoratedClass {
        @decoratorForVariables
        public horse: string = 'Pferd';
        @decoratorForVariables
        public static owner: string = 'Penie';
        constructor() {
          log('new Class constructed');
        }
      }
    });

    test('Decorators of method', '137 - 139', () => {
      function decoratorForMethods(
        target: any,
        methodKey: string,
        descriptor?: PropertyDescriptor
      ) {
        let targetName: string;
        let isStatic = false;
        if (typeof target === 'function') {
          // ? handle static property differences from typical one
          targetName = target.name;
          isStatic = true;
        } else {
          targetName = target.constructor.name;
        }
        log(
          `Targeting ${targetName} class with ${
            isStatic ? 'static' : ''
          } method named ${methodKey} with code`,
          target[methodKey],
          'and with descriptor ' + descriptor
        );
        const baseFunction = target[methodKey];
        const additionalFunctionality = () => {
          log('Running additional functionality...');
          baseFunction();
        };

        target[methodKey] = additionalFunctionality;

        return target;
      }

      class decoratedClass {
        @decoratorForMethods
        public logHorse() {
          log('run horse');
        }
        @decoratorForMethods
        public static logOwner() {
          log('run owner');
        }
        constructor() {
          log('new Class constructed');
        }
      }
      logImportant('using method with decorator');
      decoratedClass.logOwner();
      let dec = new decoratedClass();
      dec.logHorse();
    });

    test('Decorators of parameter in method', '139 - 140', () => {
      function decoratorForParameter(
        target: any,
        methodKey: string,
        parameterIndex: number
      ) {
        log(
          `Targeting ${methodKey} method in class named ${target.name} on index: ${parameterIndex}`
        );
      }

      class decoratedClass {
        static print(@decoratorForParameter msg: string) {
          log(msg);
        }
      }
    });
    test('Decorators metadata', '140 - 143', () => {
      logWarning(
        'You have to enable "emitDecoratorMetadata" in tsconfig.json',
        'install: npm i reflect-metadata --S-D',
        'install: npm i @types/reflect-metadata --S-D'
      );
      logError('not implemented for now ;)');
    });
  });
  testGroup('Generic types', '143 - 153', () => {
    logWarning(
      'code work only in typescript in javascript it will accepts all types'
    );
    test('basic use', '143 - 148', () => {
      enum binaryGenders {
        male,
        female,
      }

      class gender<T extends binaryGenders | string> {
        assignGender(youSay: T): T | string {
          if (Object.values(binaryGenders).includes(youSay)) {
            // ? check if is included in enum
            return binaryGenders[Number(youSay)];
          } else {
            return '🌈 ' + youSay;
          }
        }
      }
      const binaryGender = new gender<binaryGenders>();
      const anyGender = new gender<string>();

      log(binaryGender.assignGender(binaryGenders.male));
      log(binaryGender.assignGender(binaryGenders.female));
      log(anyGender.assignGender('trans'));
    });
    test('Limited generic type', 148, () => {
      enum binaryGenders {
        male,
        female,
      }
      interface IHuman {
        gender: binaryGenders | string;
        name: string;
      }
      class BinaryHuman implements IHuman {
        constructor(public gender: binaryGenders, public name: string) {}
      }
      class NonBinaryHuman implements IHuman {
        constructor(public gender: string, public name: string) {}
        }
        
        const isBinaryGender = (gender: unknown): gender is binaryGenders => {
            return typeof gender === 'number'
        }

      const getGenderValue = <T extends string | binaryGenders>(youSay: T) => {
        if (isBinaryGender(youSay)) return binaryGenders[youSay];

        return '🌈 ' + youSay;
      };
      const maleBob = new BinaryHuman(binaryGenders.male, 'Bob');
      const transBob = new NonBinaryHuman('trans', 'Bob');
      logImportant(
        'With generic type enum gender type will still be gender enum, after being returned from function'
      );
      logCodeTypescript(
        `const getGenderValue = <T extends string | genders>(youSay: T) => {}`
      );
      logError(
        `<T extends string | genders>(youSay: T) => {} : T`,
        `don't work due to`,
        `return 'dumb ass ' + youSay`
      );
      log(maleBob.name, getGenderValue(maleBob.gender));
      logImportant(
        'With generic type string gender type will still be gender string, after being returned from function'
      );
      log(transBob.name, getGenderValue(transBob.gender));
    });
    test('more about it', '150 - 153', () => {
      logImportant('In book ;)');
    });
  });
  testGroup('Async Await', '153 - ', () => {
    const testPromises = new TestObj('Promises', 155);
    testPromises.test(() => {
      logImportant('Longer code');
      logCodeTypescript(
        `const promise = (resolve: () => void, reject: () => void) => {
                    const afterTimeout = () => {
                        logAsync(chapter4, testPromises, 'Resolved after timeout of 2 sec')
                        resolve();
                    }
                    setTimeout(afterTimeout, 2000)
                }
                const promiseLuncher = (): Promise<void> => {
                    return new Promise<void>(
                        promise
                    );
                }`
      );
      logImportant('Shorter code');
      logCodeTypescript(
        `const promiseLuncher = (): Promise<void> => {
                return new Promise<void>(
                    (resolve: () => void, reject: () => void) => {
                        const afterTimeout = () => {
                            logAsync(chapter4, testPromises, 'Resolved after timeout of 2 sec')
                            resolve();
                        }
                        setTimeout(afterTimeout, 2000)
                    }
                )
            }`
      );
      const promiseLuncher = (): Promise<string> => {
        return new Promise<string>(
          (resolve: (msg: string) => void, reject: () => void) => {
            const afterTimeout = () => {
              resolve('Resolved after timeout of 2 sec');
            };
            setTimeout(afterTimeout, 2000);
          }
        );
      };

      promiseLuncher().then((msg) => {
        logAsync(chapter4, testPromises, msg);
      });
    });
    const testAsyncAwait = new TestObj('Async Await', 160);
    testAsyncAwait.test(async () => {
      type color = 'red' | 'gold' | 'blue' | 'green' | 'black';

      interface Dragon {
        wingsWidthInMeters: number;
        color: color;
        name: string;
      }
      const spyDragonByName = (name: string): Promise<Dragon> => {
        return new Promise<Dragon>(
          (resolve: (dragon: Dragon) => void, reject: () => void) => {
            const afterTimeout = () => {
              resolve({ wingsWidthInMeters: 5, color: 'gold', name: name });
            };
            setTimeout(afterTimeout, 1500);
          }
        );
      };

      logImportant('Using special await function');
      const { data: dragon, err } = await to(spyDragonByName('Levarien'));
      if (dragon !== null) {
        logAsync(
          chapter4,
          testAsyncAwait,
          'dragon.name',
          dragon.name,
          'dragon.color',
          dragon.color,
          'dragon.wingsWidthInMetr',
          dragon.wingsWidthInMeters
        );
      } else {
        logAsync(chapter4, testAsyncAwait, err);
      }
    });
  });
});
