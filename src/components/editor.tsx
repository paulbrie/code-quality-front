import Subject from "../lib/subjecto";
import { lintCode } from "../services/api";

const store = {
  editor: {
    value: new Subject<string>("console.log('test');"),
    checkCode: async (code: string) => {
      try {
        const result = await lintCode({ code });
        console.log('result', result)
        store.editor.analysis.next(result);
      } catch (err) {
        console.log('checkCode request err: ', err);
      }
    },
    analysis: new Subject(null),
  },
  files: {
    selectedFile: new Subject('file1'),
    static: {
      file1: `import Subject from "../lib/subjecto";
        const store = {
          editor: {
            value: new Subject<string>("console.log('test')"),
          },
          files: {
            static: {
              file1: '1',
              file2: ''
            }
          }
        };

        export default store;
      `,
      file2: `
        const store = {
          editor: {
            value: new Subject<string>("console.log('test')"),
          },
          files: {
            static: {
              file1: '2',
              file2: ''
            }
          }
        };

        export default store;
      `
    }
  }
};

export default store;
