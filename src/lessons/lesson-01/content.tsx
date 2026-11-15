import type { LessonContentProps } from '../types';
import { LessonOnePage } from './page';
import { CodeBlock } from '@/components/lesson/code-block';
import { KnowledgeTable, Note } from '@/components/lesson/primitives';
import { VariableExplorer, BranchExplorer, ProjectFlow } from '@/components/demos/fundamentals';
import { CodeDemonstration } from '@/components/demos/code-demonstration';
import { dailyMessageCode } from '../shared-code';
import { functionCases, typeCases, variableCases } from './demonstrations';
import { examples } from './code';

export function LessonOne({ lesson }: LessonContentProps) {
  return (
    <LessonOnePage
      lesson={lesson}
      chapters={[
        <div key="mission">
          <p>
            假设王奶奶独自生活。每天早上，她打开
            SeniorCare，点一下“我今天挺好”，家人就能看到一句更新。这是课程里的示例场景，我们先看背后的程序怎样工作。
          </p>
          <ProjectFlow />
          <p>
            按钮不会自己理解“挺好”的含义。程序需要明确的数据和规则：是谁，有没有收到今天的打卡，这次打卡有没有表示需要帮助，然后根据这些信息选择一句话。
          </p>
          <Note title="本课主线：数据 → 判断 → 结果">
            <p>
              变量记住数据，类型说明数据的要求，条件选择执行路径，函数把一套规则装在一起。最后用完整案例串起这四件事。
            </p>
          </Note>
          <KnowledgeTable
            caption="同一段程序面对的三种情况"
            headers={['收到的资料', '应该显示什么', '原因']}
            rows={[
              ['没有收到打卡', '今日尚未打卡', '目前没有今天的报告'],
              ['已打卡，没有表示需要帮助', '今日已报平安', '消息来自已收到的打卡'],
              ['已打卡，并表示需要帮助', '需要帮助，请联系确认', '不能把所有已打卡都当成平安'],
            ]}
          />
          <p>
            没有收到打卡只表示缺少报告，不能直接推断平安或紧急情况。程序按照已经约定的规则处理已有信息。
          </p>
        </div>,
        <div key="program">
          <p>
            程序可以先理解成一份<strong>按规则执行的说明书</strong>
            。普通语句通常从上到下执行；遇到判断会选择路径，遇到函数调用会进入相应的步骤。
          </p>
          <CodeBlock
            title="顺序执行：先打印第一句，再打印第二句"
            code={examples.first}
            output={'你好，SeniorCare！\n今天，我们来生成一条打卡消息。'}
          />
          <p>
            <code>console.log(...)</code>{' '}
            把括号中的内容打印到控制台，方便观察。它不会自动生成网页，也不会把资料保存到数据库。这里的控制台就是展示程序输出的地方。
          </p>
          <p>
            双引号包住文字；分号用来结束一条语句；<code>{'//'}</code>{' '}
            后面是注释，给人解释代码，不参与执行。交换上面两行，打印顺序也会交换。
          </p>
          <h3>JavaScript 运行，TypeScript 增加类型检查</h3>
          <p>
            JavaScript 是浏览器可以运行的语言。TypeScript
            在它的基础上加入类型说明和检查，例如发现“这里要求数字，却放进了文字”。生成 JavaScript
            时，类型注解会被去掉。
          </p>
          <KnowledgeTable
            caption="类型检查和实际运行是两个阶段"
            headers={['阶段', '负责什么', '不能保证什么']}
            rows={[
              ['类型检查', '检查代码是否符合类型约定', '不能保证计算规则符合人的需求'],
              ['实际运行', '执行语句，计算结果，打印内容', '能运行也可能算错'],
            ]}
          />
          <Note title="一个重要区别">
            <p>
              把年龄写成数字，再把“加 1”误写成“加
              10”，通常仍能通过类型检查。但结果不符合需求，这属于逻辑问题。
            </p>
          </Note>
        </div>,
        <div key="variables">
          <p>
            <strong>变量就是程序用来记住数据的名字。</strong>
            像给盒子贴标签，名字让代码能找到当前的值。例如 name 保存姓名，hasCheckedIn
            保存是否打卡。
          </p>
          <CodeBlock title="声明、赋值和读取" code={examples.variables} output="王奶奶 true" />
          <p>
            <code>let hasCheckedIn = false</code> 是创建变量并给它初始值；
            <code>hasCheckedIn = true</code>{' '}
            是给已有变量重新赋值；打印时读取的是执行到那一行时的值。
          </p>
          <p>
            <code>=</code>{' '}
            读成“把右边的结果放到左边”，不是数学中的等式证明。右边可以是一个值，也可以是需要先计算的表达式。
          </p>
          <VariableExplorer />
          <h3>let 允许重新赋值，const 不允许</h3>
          <p>
            不需要重新赋值的变量通常用 <code>const</code>，需要改变当前值时用 <code>let</code>
            。重新赋值时不重复声明变量。
          </p>
          <CodeDemonstration title="变量案例：哪些写法可以，哪些不可以" cases={variableCases} />
          <Note title="变量改变，不会让之前的语句重跑">
            <p>
              如果先打印 false，再把变量改成 true，已经打印的 false 不会自动变成
              true。只有再执行一次打印，才会出现新的值。
            </p>
          </Note>
          <p>
            变量名区分大小写，<code>name</code> 与 <code>Name</code> 是两个名字。旧代码中的{' '}
            <code>var</code> 也是变量声明方式，作用域规则有所不同；本课程使用 let 和 const。
          </p>
        </div>,
        <div key="types">
          <p>
            姓名是一段文字，年龄是数字，是否打卡只有是或否。
            <strong>类型描述一份数据允许是什么样。</strong>看起来相似的值，类型可能完全不同。
          </p>
          <CodeBlock title="三种基本类型" code={examples.types} output="王奶奶今年 77 岁。" />
          <KnowledgeTable
            caption="先看值的类型，再看它长什么样"
            headers={['类型', '示例', '含义']}
            rows={[
              ['string', '"王奶奶"、"77"、"false"', '文字，用引号包住'],
              ['number', '77、0、0.5', '可以做数值运算的数字'],
              ['boolean', 'true、false', '只有真、假两种值，不加引号'],
            ]}
          />
          <p>
            <code>age: number</code> 中的冒号是在说明类型，不是在提供年龄值。<code>= 77</code>{' '}
            才是给变量赋值。TypeScript 也能根据初始值推断类型，因此省略注解不等于没有类型。
          </p>
          <CodeBlock title="推断类型：从初始值知道 age 应该是数字" code={examples.inference} />
          <h3>表达式会算出一个值</h3>
          <p>
            <code>age + 1</code> 得到数字，<code>age &gt;= 65</code>{' '}
            得到布尔值。反引号包住模板字符串，其中的 <code>{'${...}'}</code>{' '}
            会把表达式的结果放进文字。
          </p>
          <CodeBlock
            title="数字、比较与文字组合"
            code={examples.expressions}
            output={'78\n明年年龄： 78'}
          />
          <CodeDemonstration title="数字与文字：三种完整案例" cases={typeCases} />
        </div>,
        <div key="conditions">
          <p>
            变量记住情况，<strong>条件语句根据情况选择下一步</strong>
            。日常的“如果下雨就带伞，否则照常出门”，就有两个执行方向。
          </p>
          <CodeBlock
            title="if 与 else：两条路径只走一条"
            code={examples.condition}
            output="今日尚未打卡。"
          />
          <p>
            括号里的条件是 true，执行 if 后的花括号；条件是 false，执行 else
            后的花括号。花括号把这个分支要执行的语句放在一起。
          </p>
          <h3>把问题写成一个布尔值</h3>
          <CodeBlock
            title="比较表达式的结果是 true 或 false"
            code={examples.comparison}
            output={'true\nfalse\ntrue'}
          />
          <KnowledgeTable
            caption="常用条件运算符"
            headers={['写法', '白话含义', '例子']}
            rows={[
              ['=== / !==', '严格相等 / 不相等', '77 === 65 得到 false'],
              ['> / >=', '大于 / 大于或等于', '65 > 65 是 false，65 >= 65 是 true'],
              ['< / <=', '小于 / 小于或等于', '60 < 65 得到 true'],
              ['!', '不是，把布尔结果反过来', '!false 得到 true'],
              ['&&', '并且，两个条件都成立', 'true && false 得到 false'],
              ['||', '或者，至少一个条件成立', 'true || false 得到 true'],
            ]}
          />
          <Note title="赋值和比较用不同的符号">
            <p>
              <code>=</code> 是放入数据，<code>===</code> 才是在比较。
              <code>hasCheckedIn = true</code> 会修改变量；<code>hasCheckedIn === true</code>{' '}
              只会算出一个判断结果。
            </p>
          </Note>
          <p>
            <code>hasCheckedIn &amp;&amp; !needsHelp</code>{' '}
            可以读成“已经打卡，并且没有表示需要帮助”。两个部分都成立，整体才是 true。
          </p>
          <CodeBlock
            title="条件运算案例：先分别理解，再组合"
            code={examples.logical}
            output={'false\ntrue\nfalse'}
          />
        </div>,
        <div key="branches">
          <p>
            只有“打卡”和“没打卡”两个方向还不够。收到打卡之后，还要看这次有没有表示需要帮助。这里需要按顺序判断三个状态。
          </p>
          <CodeBlock
            title="if / else if / else：选择第一个成立的分支"
            code={examples.branches}
            output="王奶奶今日已报平安。"
          />
          <p>
            这是一条连续的判断链：从上往下检查，执行第一个成立的分支，后面的分支跳过。最后的 else
            接住前面都不成立的情况。
          </p>
          <BranchExplorer />
          <KnowledgeTable
            caption="判断顺序决定消息含义"
            headers={['hasCheckedIn', 'needsHelp', '执行结果']}
            rows={[
              ['false', '不读取', '先返回“今日尚未打卡”'],
              ['true', 'true', '已收到打卡，返回“需要帮助”'],
              ['true', 'false', '已收到打卡，返回“已报平安”'],
            ]}
          />
          <Note title="一个能运行、但规则不完整的写法" kind="warning">
            <p>
              如果只写“已打卡就显示平安”，程序可能照常运行，却漏掉“打卡时表示需要帮助”的情况。判断条件要反映真实规则，不能只看代码是否运行成功。
            </p>
          </Note>
          <p>
            这里先判断有没有打卡，是因为 needsHelp
            描述的是“这次打卡的内容”。没有收到报告时，不应该先解释报告中的状态。
          </p>
        </div>,
        <div key="functions">
          <p>
            给王奶奶和李爷爷生成消息时，规则相同、输入不同。
            <strong>函数把一套可重复使用的步骤装在一起。</strong>
            每次调用给它具体输入，它就按规则计算一次。
          </p>
          <CodeBlock
            title="先看一个只有一个参数的函数"
            code={examples.simpleFunction}
            output={'你好，王奶奶！\n你好，李爷爷！'}
          />
          <KnowledgeTable
            caption="把函数的各部分读成白话"
            headers={['代码部分', '名称', '含义']}
            rows={[
              ['function greet', '定义与名字', '保存一套叫 greet 的规则'],
              ['name: string', '参数及类型', '这套规则需要一个文字输入'],
              ['): string', '返回类型', '执行后交回一段文字'],
              ['return ...', '返回', '把结果交回调用处，并结束本次执行'],
              ['greet("王奶奶")', '调用', '带着具体输入，真正执行这套规则'],
            ]}
          />
          <p>
            定义函数像写好一份制作饮料的流程；调用才是交给它一个具体订单。只写定义不会自动执行函数体，调用两次就会按各自的输入执行两次。
          </p>
          <h3>返回值是交回来的结果，打印只是展示</h3>
          <p>
            <code>{'const message = greet("王奶奶")'}</code> 会把返回的文字保存到
            message。之后可以打印、显示或继续处理它。只有 console.log 而没有
            return，不能替代“返回文字”。
          </p>
          <CodeBlock title="把原来的三分支规则装进函数" code={dailyMessageCode} />
          <p>
            三个参数按顺序对应姓名、是否打卡、是否需要帮助。name
            只在函数内部代表这次调用传进来的姓名；不同调用使用自己的参数。
          </p>
          <Note title="return 结束的是这次函数调用">
            <p>
              没有打卡时，第一个 return 立即交回消息，后面的判断不再执行。已经打卡时才继续看
              needsHelp。这与前面的 if / else if / else 使用同一套判断顺序。
            </p>
          </Note>
        </div>,
        <div key="case-study">
          <p>
            现在用已经写完整的案例，把“输入 → 判断 → 返回 →
            输出”连接起来。每个案例都提供全部代码和解释。
          </p>
          <CodeDemonstration title="完整案例：同一个函数，不同的执行结果" cases={functionCases} />
          <KnowledgeTable
            caption="以李爷爷已打卡、没有表示需要帮助为例"
            headers={['执行阶段', '具体发生什么']}
            rows={[
              ['输入', '把“李爷爷”、true、false 交给三个参数'],
              ['第一次判断', '!hasCheckedIn 是 false，不走未打卡分支'],
              ['第二次判断', 'needsHelp 是 false，不走求助分支'],
              ['返回', '最后的 return 交回“李爷爷今日已报平安。”'],
              ['输出', 'console.log 把返回的文字打印出来'],
            ]}
          />
          <p>
            “只有定义”和“打印代替返回”两个对照案例分别说明：保存规则不等于执行规则；看到控制台文字不等于调用者拿到了返回值。
          </p>
        </div>,
        <div key="review">
          <p>
            本课的知识按一条线连接：先有数据，再按类型约定使用数据，用条件选路径，最后让函数把结果交回去。
          </p>
          <KnowledgeTable
            caption="本课概念与常见误区"
            headers={['知识点', '正确理解', '常见误区']}
            rows={[
              ['变量', '名字对应执行到此刻的值', '修改值会让之前的打印自动更新'],
              ['类型', '约定允许的值及用法', '"false" 与 false 可以互换'],
              ['条件', '判断结果决定执行路径', '把 = 当成 ==='],
              ['函数', '定义规则，调用时执行', '写了函数就会自动运行'],
              ['return', '交回结果并结束本次调用', 'console.log 可以代替 return'],
            ]}
          />
          <Note title="接下来：把相关数据放在一起">
            <p>
              这节课的函数一次接收一个人的三个输入。第二课会用对象组织这三个字段，用数组保存多个人，再用循环重复调用同一套规则。
            </p>
          </Note>
        </div>,
      ]}
    />
  );
}
