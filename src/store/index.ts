import Subject from "../lib/subjecto";
import { lintCode } from "../services/api";

const store = {
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
      `,
      'text.js': `
        function a(x) {
          if (x > 1) {
              return x; // 1st path
          } else if (x > 2) {
              return x+1; // 2nd path
          } else {
              return 4; // 3rd path
          }
      }
      `,
    }
  },
  editor: {
    value: new Subject<string>(''),
    analysis: new Subject(null),
    checkCode: async (code: string) => {
      try {
        const result = await lintCode({ code });
        store.editor.analysis.next(result);
      } catch (err) {
        console.log('checkCode request err: ', err);
      }
    },
  },
};

export default store;
