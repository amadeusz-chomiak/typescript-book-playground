const to = async <T>(promise: Promise<T>) => {
    try {
        const data = await promise;
        return { err: null, data: data };
    }
    catch (err) {
        return { err: err, data: null };
    }
}

class Chapter {
    constructor(public readonly name: string, public readonly id: number, public readonly bookPage: string) { }
    create(runTest: () => void) {
        createChapter(this, runTest)
    }
}
class TestObj {
    constructor(public readonly name: string, public readonly bookPage: string | number) { }
    test(runTest: () => void) {
        test(this.name, this.bookPage, runTest);
    }
    testGroup(runTest: () => void) {
        testGroup(this.name, this.bookPage, runTest);
    }
}
//logs
const log = (...msgs: any[]) => console.log(`${msgs.join(' => ')}`);
const logImportant = (...msgs: any[]) => console.log(`%c${msgs.join(' => ')}`, 'font-weight: bold')
const logError = (...msgs: any[]) => console.log(`%cError: ${msgs.join(' => ')}`, 'color: #700020; font-weight: bold; font-size: 1.05rem')
const logWarning = (...msgs: any[]) => console.log(`%c${msgs.join(' => ')}`, 'color: #FEE403; background-color: #000; padding: 4px 10px; font-weight: bold')
const logAsync = (chapter: Chapter, testObj: TestObj, ...msgs: any[]) => {
    logAsyncSection(chapter, testObj);
    console.log(`%c${msgs.join(' => ')}`, 'color: #B95060; font-size: 0.85rem')
    logSectionEnd();
}
const logCode = (...msgs: any[]) => {
    logSectionCode('Compiled code')
    console.log(`%c${msgs.join(' => ')}`, 'color: #747574;')
    logSectionEnd()
}
const logCodeTypescript = (...msgs: any[]) => {
    logSectionCode('Part of important typescript code')
    console.log(`%c${msgs.join(' => ')}`, 'color: #747574;')
    logSectionEnd()
}
//selection creators
const logSection = (sectionName: string, bookPage: string | number): void => {
    console.groupCollapsed(`%cTest ${sectionName} %cStr. ${bookPage}`, 'color: #3E8F00; font-size: 1.05rem', 'color: #747574');
}
const logSectionGroup = (sectionName: string, bookPage: string | number): void => {
    console.groupCollapsed(`%c#Tests ${sectionName} %cStr. ${bookPage}`, 'color: #3E8F00; font-size: 1.2rem', 'color: #747574');
}
const logChapterSection = (chapter: Chapter): void => {
    console.groupCollapsed(`%cCh. ${chapter.id} ${chapter.name} %cStr. ${chapter.bookPage}`, 'color: #B95000; font-size: 1.5rem; font-weight: bold;', 'color: #747574; font-size: 1.05rem');
}
const logAsyncSection = (chapter: Chapter, testObj: TestObj): void => {
    console.groupCollapsed(`%cAsync: ${testObj.name} Ch. ${chapter.id} ${chapter.name} %cStr. ${testObj.bookPage}`, 'color: #B95060; font-size: 0.85rem', 'color: #747574; font-size: 0.70rem');
}
const logSectionCode = (title: string): void => {
    console.groupCollapsed(`%c${title}`, 'color: #747574; font-size: 0.9rem');
}
const logSectionEnd = (): void => {
    console.groupEnd();
}

//test creator
/**
 * Create test for one topic in the book in browser console
 *
 * @remarks
 * Auto create code overview 
 *
 * @param testName - Name of test group
 * @param bookPage - String or Number of book's page with topic
 * @param runTest - Function with test ex. ()=>{} 
 */
const test = (testName: string, bookPage: string | number, runTest: () => void): void => {
    logSection(testName, bookPage);
    logCode(runTest)
    runTest();
    logSectionEnd();
}

const testGroup = (testName: string, bookPage: string | number, runTest: () => void): void => {
    logSectionGroup(testName, bookPage);
    runTest();
    logSectionEnd();
}
// const testGroup = (testObj: testObj, runTest: () => void): void => {
//     logSectionGroup(testObj.name, testObj.bookPage);
//     runTest();
//     logSectionEnd();
// }
const createChapter = (chapter: Chapter, runTest: () => void): void => {
    logChapterSection(chapter);
    runTest();
    logSectionEnd();
}
