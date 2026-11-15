import type { LessonContentProps } from '../types';
import { LessonChapters } from '../lesson-chapters';
import { CodeBlock } from '@/components/lesson/code-block';
import { KnowledgeTable, Note, Review } from '@/components/lesson/primitives';
import { CodeDemonstration } from '@/components/demos/code-demonstration';
import { ObjectExplorer, ArrayExplorer, LoopExplorer } from '@/components/demos/collections';
import { dailyMessageCode } from '../shared-code';
import { examples, buildMessagesCode } from './code';
import {
  conceptExamples,
  manualResidentsCode,
  thirdResidentCode,
  objectCases,
  arrayCases,
  loopCases,
  messageCases,
} from './demonstrations';
import { lessonSections, schedule } from './sections';

export function LessonTwo({ lesson }: LessonContentProps) {
  return (
    <LessonChapters
      lesson={lesson}
      sections={lessonSections}
      schedule={schedule}
      chapters={[
        <div key="recap">
          <p>
            上一课讲过一个函数：输入姓名、有没有打卡、是否需要帮助，返回一句消息。函数里的判断规则已经写好，不同调用使用不同的输入。
          </p>
          <CodeBlock
            title="函数调用片段：保存结果，再打印结果"
            code={'const message = getDailyMessage("李爷爷", true, false);\nconsole.log(message);'}
            output="李爷爷今日已报平安。"
          />
          <KnowledgeTable
            caption="同一个函数，输入不同，结果不同"
            headers={['姓名', '有没有打卡', '是否需要帮助', '返回消息']}
            rows={[
              ['王奶奶', 'false', '不读取', '今日尚未打卡'],
              ['李爷爷', 'true', 'false', '今日已报平安'],
              ['陈奶奶', 'true', 'true', '表示需要帮助，请联系确认'],
            ]}
          />
          <Review question="参考：第一课已经讲过的函数">
            <CodeBlock code={dailyMessageCode} />
            <p>
              先确认有没有收到打卡，再看这次打卡的内容。return 把消息交回调用处，console.log
              负责展示。
            </p>
          </Review>
          <Note title="本课继续使用的旧知识">
            <p>
              变量保存数据，类型约定值的要求，函数接受输入并返回结果。对象、数组和循环会把这些知识连接起来。
            </p>
          </Note>
        </div>,
        <div key="mission">
          <p>
            上一课已经把打卡判断放进 getDailyMessage，规则只需要写一次。
            但有多个人时，如果资料仍然用零散变量保存，就要给每个人分别准备一组变量，
            再分别写一次函数调用。
          </p>
          <CodeBlock
            title="调用片段：使用上一课的函数，分别处理两个人"
            code={manualResidentsCode}
            output={'王奶奶今日尚未打卡。\n李爷爷今日已报平安。'}
          />
          <p>
            name1、hasCheckedIn1、needsHelp1 属于王奶奶；后缀为 2 的三个变量属于李爷爷。 两行
            getDailyMessage 调用分别取出各自的一组资料，执行同一套判断规则。
          </p>
          <h3>再增加一个人，要增加哪些代码？</h3>
          <CodeBlock
            title="继续增加陈奶奶：新增三个变量，再新增一次调用"
            code={thirdResidentCode}
            output="陈奶奶表示需要帮助，请联系确认。"
          />
          <p>
            这种写法可以工作。新增第三个人时，原来两个人的代码不必改，但要新增第三组变量和第三次调用。
            到三十个人时，就是三十组资料和三十次手写的调用，也更容易把某个人的姓名与另一个人的状态传混。
          </p>
          <Review question="对照：没有使用函数时，复制判断长什么样？">
            <CodeBlock
              title="重复写法：同一套 if / else if / else 写了两遍"
              code={conceptExamples.repeatedBranches}
              output={'王奶奶今日尚未打卡。\n李爷爷今日已报平安。'}
            />
            <p>
              这里第一整段判断处理王奶奶，第二整段判断处理李爷爷，判断规则完全一样，
              只把变量名末尾的 1 换成了 2。如果消息文案或判断规则改变，就需要同步修改两处。
              上一课把这些判断放进一个函数后，规则只需要修改一处。
            </p>
          </Review>
          <Note title="函数解决重复规则，数组与循环解决逐个人手写的处理">
            <p>
              有了函数，就不用为每个人复制 if 判断。本课会进一步把一个人的字段放进对象，
              把多个人放进数组，再由循环逐项调用函数。这样增加一个人时，通常只需要在资料列表里增加一项。
            </p>
          </Note>
          <p>
            可以先把问题分成两层：<strong>一份资料里有什么</strong>，以及
            <strong>列表里有多少份资料</strong>。
          </p>
          <KnowledgeTable
            caption="三个新概念，各解决一个问题"
            headers={['概念', '生活中的类比', '在程序中做什么']}
            rows={[
              ['对象', '一张填写完整的资料卡', '把一个人的相关字段放在一起'],
              ['数组', '按顺序排好的一叠资料卡', '保存零份、一份或多份资料'],
              ['循环', '从第一张开始，逐张处理', '对每一项执行相同的规则'],
            ]}
          />
          <Note title="本课案例的输入与输出">
            <p>
              输入是“多个人的资料组成的列表”，输出是“多条文字消息组成的列表”。数据从列表进入程序，经过逐项处理，再形成新的列表。
            </p>
          </Note>
          <p>
            讲解先从简单的姓名列表、成绩列表开始，再回到 SeniorCare
            的资料。这样可以先看清数组和循环本身，再理解完整案例。
          </p>
        </div>,
        <div key="objects">
          <h3>先从熟悉的学生资料开始</h3>
          <p>
            描述一个学生时，通常会提到姓名、年龄和班级。沿用第一课的变量写法，可以分别保存这三项信息。
          </p>
          <CodeBlock
            title="三个变量，都在描述小林"
            code={conceptExamples.studentVariables}
            output={'小林\n16\n高一三班'}
          />
          <p>
            这种写法可以运行。不过，这三个名字彼此独立，代码中没有直接说明它们属于同一个学生。
            如果还要描述小周，就会出现更多零散的姓名、年龄和班级变量。
          </p>
          <h3>对象就像一张学生资料卡</h3>
          <p>
            可以把同一个学生的资料放进一个对象，给整份资料起名叫 <code>student</code>。
            <strong>对象把属于同一件事的数据放在一起。</strong>
            资料卡上的每一项叫一个<strong>属性</strong>，也常被叫作字段。
          </p>
          <CodeBlock
            title="一个 student 对象，包含三项相关资料"
            code={conceptExamples.studentCard}
            output={'小林\n16\n高一三班'}
          />
          <p>
            等号右边的 <code>{'{}'}</code> 包住这份对象的内容。每个属性写成
            <code>属性名: 值</code>，属性之间用逗号分开。<code>{'name: "小林"'}</code>
            表示“姓名这一项的值是小林”。
          </p>
          <KnowledgeTable
            caption="从零散变量，到同一张资料卡里的属性"
            headers={['原来的变量', '放进对象后的读取方式', '得到的值']}
            rows={[
              ['name', 'student.name', '小林'],
              ['age', 'student.age', '16'],
              ['className', 'student.className', '高一三班'],
            ]}
          />
          <p>
            <code>student</code> 代表整张资料卡；<code>student.name</code>
            读成“student 这份资料里的姓名”。点号表示从这个对象里找一个属性。
            对象只需要记录当前程序关心的信息，不必把一个人的所有资料都写进去。
          </p>
          <Note title="面向对象：先建立一个基本印象">
            <p>
              编程时，可以用对象表示学生、书籍、订单等人或事物。对象可以包含相关数据，
              也可以包含相关操作，例如一份学生资料，以及根据这份资料生成自我介绍的操作。
              围绕对象和它们之间的配合来组织程序，是面向对象编程的基本思路。
            </p>
            <p>
              这一课先把“对象怎样组织资料”讲清楚：创建对象、读取属性、修改属性，
              再用类型说明资料应该包含什么。
            </p>
          </Note>
          <h3>回到 SeniorCare：资料不同，组织方式相同</h3>
          <p>
            学生资料卡保存姓名、年龄和班级；这里的打卡资料保存姓名、有没有打卡、是否需要帮助。
            把同一个人的字段放进同一个对象，就能清楚地看到这几项资料属于谁。
          </p>
          <CodeBlock
            title="person 是一份资料，name 等是资料里的字段"
            code={examples.object}
            output={'王奶奶\nfalse'}
          />
          <p>
            这里把整份资料叫作 <code>person</code>。其中 name 是文字，另外两项是布尔值。
            同一个对象的不同属性，可以分别保存不同类型的值。
          </p>
          <KnowledgeTable
            caption="由整体找到其中一项"
            headers={['表达式', '读法', '得到什么']}
            rows={[
              ['person', '整份资料', '一个对象'],
              ['person.name', '这份资料的姓名', '文字“王奶奶”'],
              ['person.hasCheckedIn', '这份资料的打卡状态', '布尔值 false'],
            ]}
          />
          <h3>修改属性，只更新资料中的一项</h3>
          <CodeBlock title="赋值片段：把打卡状态更新为 true" code={examples.update} output="true" />
          <ObjectExplorer />
          <Note title="const 限制重新赋值，不会自动冻结对象">
            <p>
              <code>person.hasCheckedIn = true</code> 改的是对象内的字段；<code>person = ...</code>{' '}
              是重新给变量赋值。前者在这里允许，后者被 const
              限制。姓名和其他字段不会因为这次属性赋值自动改变。
            </p>
          </Note>
        </div>,
        <div key="object-types">
          <p>
            变量可以有 string、number 这样的类型，一份对象也可以有“它应该包含什么”的约定。
            <code>Resident</code> 就是我们给这份资料格式起的类型名字。
          </p>
          <CodeBlock
            title="上半部分规定类型，下半部分提供实际资料"
            code={examples.typedObject}
            output="王奶奶"
          />
          <p>
            <code>type Resident = ...</code>{' '}
            不会创建一个真实的人，也不会自动填入姓名。它只描述资料的要求。
            <code>const person: Resident = ...</code> 才是创建一个符合要求的实际对象。
          </p>
          <KnowledgeTable
            caption="冒号在不同位置的含义"
            headers={['位置', '写法', '含义']}
            rows={[
              ['类型定义里', 'name: string', 'name 的值必须是文字'],
              ['对象的实际数据里', 'name: "王奶奶"', 'name 当前的值是王奶奶'],
              ['变量声明里', 'person: Resident', '整份资料要符合 Resident 的约定'],
            ]}
          />
          <CodeDemonstration
            title="对象类型案例：字段名称、是否完整、值的类型"
            cases={objectCases}
          />
          <p>
            类型检查关心的是对象是否符合约定。漏掉必需字段、把布尔值写成文字、把 name 写成
            Name，分别是不同的错误；这些案例直接展示各自的原因。
          </p>
        </div>,
        <div key="arrays">
          <h3>1. 数组是有顺序的一组数据</h3>
          <p>
            班级名单有多个姓名，一次考试有多个成绩。它们都适合放进<strong>数组</strong>
            ：一个变量保存一组有顺序的值，每一项叫一个元素。数组可以为空，也可以只有一个元素。
          </p>
          <CodeBlock
            title="先看最简单的文字数组"
            code={conceptExamples.names}
            output={'3\n小林\n小陈'}
          />
          <p>
            等号右边的 <code>[]</code> 包住实际的元素，元素之间用逗号分隔。<code>string[]</code>{' '}
            则是在说明类型：这个数组的每一项都应该是文字。
          </p>
          <KnowledgeTable
            caption="方括号出现在不同位置，有不同含义"
            headers={['写法', '用途', '白话解释']}
            rows={[
              ['string[]', '类型', '一组文字'],
              ['["小林", "小周"]', '创建数组', '现在放入两个姓名'],
              ['names[0]', '读取元素', '读取 names 的第一项'],
              ['[]', '创建空数组', '已经有列表，但里面暂时没有元素'],
            ]}
          />
          <h3>2. 下标是位置，length 是个数</h3>
          <p>
            TypeScript 数组的下标从 <strong>0</strong>{' '}
            开始。可以把下标理解成“前面已经有几个元素”：第一项前面有 0 项，所以用 0；第二项前面有 1
            项，所以用 1。
          </p>
          <KnowledgeTable
            caption="三个人的名单：顺序、下标和值"
            headers={['平常的叫法', '数组下标', '代码', '结果']}
            rows={[
              ['第一个姓名', '0', 'names[0]', '小林'],
              ['第二个姓名', '1', 'names[1]', '小周'],
              ['第三个姓名', '2', 'names[2]', '小陈'],
              ['元素个数', '不是下标', 'names.length', '3'],
            ]}
          />
          <p>
            如果有 n 个元素，已有元素的下标就是 0 到 n − 1。<code>names[names.length]</code>{' '}
            已经越过末尾。空数组的 length 是 0，它没有第一项，也没有有效的最后一项。
          </p>
          <h3>3. 替换已有元素，与追加新元素不同</h3>
          <CodeBlock
            title="替换第二项，再往末尾追加一项"
            code={conceptExamples.updateArray}
            output={'["小林","小陈","小李"]\n3'}
          />
          <p>
            <code>{'names[1] = "小陈"'}</code> 替换已有的第二项，人数仍然是 2；
            <code>{'names.push("小李")'}</code> 在末尾加入第三项，人数才变成 3。这里用 push
            追加，避免手动计算新位置。
          </p>
          <Note title="数组类型约定的是每个元素">
            <p>
              <code>number[]</code> 放数字，<code>string[]</code> 放文字。JavaScript
              的数组本身可以容纳不同类型的值，但这里声明了
              string[]，就必须遵守“每项都是文字”的约定。
            </p>
            <p>
              <code>const</code> 数组允许替换元素和追加元素；它限制的是给整个变量重新赋值。
            </p>
          </Note>
          <h3>4. 对象数组：每一项是一份完整资料</h3>
          <CodeBlock
            title="Resident[]：一个数组里放多个 Resident 对象"
            code={examples.arrays}
            output={'3\n王奶奶\n陈奶奶'}
          />
          <p>
            <code>residents[0].name</code> 分两步读：先用 <code>[0]</code> 取第一份对象，再用{' '}
            <code>.name</code> 取这份对象的姓名。一个对象有三个字段，仍然只算数组里的一个元素。
          </p>
          <ArrayExplorer />
          <h3>5. 数组不存在的那一项，不会凭空出现</h3>
          <p>
            <code>undefined</code>{' '}
            表示这里没有值。读取超出范围的元素会得到它；如果继续把它当对象读取属性，会发生运行错误。这与元素类型不匹配，是不同的问题。
          </p>
          <CodeDemonstration title="数组案例：正确用法、类型错误和越界" cases={arrayCases} />
          <Note title="“数组长度”与“数组本身”也不同">
            <p>
              push
              在原数组末尾加入元素，并返回新的长度。它不会把整个数组作为返回值；完整列表仍然保存在原来的变量中。
            </p>
          </Note>
        </div>,
        <div key="loops">
          <h3>1. 循环把相同的步骤交给每一项</h3>
          <p>
            给三个人问候时，可以写三次打印；名单增长到三十个人，重复代码就不方便了。
            <strong>循环把“要做什么”写一次，让每个元素都经历同样的步骤。</strong>
          </p>
          <CodeBlock
            title="从姓名数组开始理解 for...of"
            code={conceptExamples.simpleLoop}
            output={'你好，小林！\n你好，小周！\n你好，小陈！\n全部问候完毕'}
          />
          <p>
            <code>for (const name of names)</code> 读成：“从 names 按顺序取出每个元素，这一轮叫它
            name，执行一次花括号里的步骤。”name 是本轮的值，不是 0、1、2 这样的下标。
          </p>
          <KnowledgeTable
            caption="for...of 每一部分负责什么"
            headers={['部分', '作用']}
            rows={[
              ['names', '要遍历的整个数组'],
              ['const name', '给这一轮取出的元素起名字'],
              ['of', '表示从后面的数组逐项取值'],
              ['花括号中的语句', '循环体，每取出一项就执行一次'],
              ['循环后面的语句', '全部元素处理完之后，继续执行'],
            ]}
          />
          <h3>2. 一轮内部按顺序执行，再开始下一轮</h3>
          <KnowledgeTable
            caption="三次问候的执行顺序"
            headers={['阶段', '本轮 name', '发生什么']}
            rows={[
              ['第一轮', '小林', '打印“你好，小林！”'],
              ['第二轮', '小周', '打印“你好，小周！”'],
              ['第三轮', '小陈', '打印“你好，小陈！”'],
              ['循环结束', '没有下一项', '执行外面的打印，只打印一次“全部问候完毕”'],
            ]}
          />
          <p>
            一轮先把循环体中的普通语句从上往下执行完，才会取下一项。对这里没有增删元素的数组，元素数就是循环轮数：三项执行三轮，一项执行一轮，空数组执行零轮。
          </p>
          <Note title="每一轮都有自己的循环变量">
            <p>
              for...of 的每一轮会创建本轮的 name，所以可以使用 const。它不是对同一个 const
              变量反复赋值。这个 name 在循环体范围内使用；循环结束后，不能直接拿它当成外面的变量。
            </p>
          </Note>
          <h3>3. 循环不仅能打印，也能累计结果</h3>
          <CodeBlock title="把三个成绩累加起来" code={conceptExamples.sum} output="270" />
          <KnowledgeTable
            caption="total 随每轮执行发生变化"
            headers={['阶段', '本轮 score', 'total 原值', '相加后的 total']}
            rows={[
              ['开始前', '尚未取值', '—', '0'],
              ['第一轮', '80', '0', '80'],
              ['第二轮', '90', '80', '170'],
              ['第三轮', '100', '170', '270'],
            ]}
          />
          <p>
            累计值 total 放在循环外，准备一次，后面每轮继续更新。如果在循环体里每次都写{' '}
            <code>let total = 0</code>，每轮都会从零开始，得到的就不是总分。
          </p>
          <CodeDemonstration title="循环案例：轮数、空数组与变量的位置" cases={loopCases} />
          <h3>4. 把每轮的结果收集到新数组</h3>
          <CodeBlock
            title="一组姓名，变成一组问候消息"
            code={conceptExamples.collect}
            output={'["你好，小林！","你好，小周！"]'}
          />
          <p>
            names 是输入列表，greetings 是结果列表。循环外先准备空的结果数组；每轮得到一条文字，用
            push 追加进去。处理了两个人，结果数组就有两条问候。这就是接下来多人打卡案例的基本结构。
          </p>
          <Note title="循环只重复步骤，不会自动替我们保存结果">
            <p>
              循环体里只有 console.log，就只是在打印。需要把结果留在列表中，就要明确写
              push；需要把列表交给函数调用者，还要明确写 return。
            </p>
          </Note>
        </div>,
        <div key="case-study">
          <p>
            现在回到 SeniorCare。姓名、是否打卡、是否需要帮助放在 Resident 对象里；多个人放在
            Resident[] 中。每轮取出一份对象，交给上一课的函数，再把消息放入新的数组。
          </p>
          <CodeBlock
            title="完整的列表处理函数：准备 → 遍历 → 收集 → 返回"
            code={buildMessagesCode}
          />
          <KnowledgeTable
            caption="区分两层函数与各个变量"
            headers={['名称', '类型', '代表什么']}
            rows={[
              ['residents', 'Resident[]', '传入的全部资料'],
              ['person', 'Resident', '当前这一轮的一份资料'],
              ['message', 'string', 'getDailyMessage 返回的一条文字'],
              ['messages', 'string[]', '已经收集的多条文字'],
              ['buildDailyMessages 的返回值', 'string[]', '所有轮次处理完的完整结果'],
            ]}
          />
          <p>
            一开始 messages 是
            []。第一轮加入王奶奶的消息，第二轮再加入李爷爷的消息，第三轮再加入陈奶奶的消息，最后一次性把完整数组返回。
          </p>
          <LoopExplorer />
          <h3>旧函数返回一条消息，新函数返回整个列表</h3>
          <p>
            <code>getDailyMessage</code> 里的 return
            只结束这次单人消息计算，结果交回循环体，外层循环会继续。<code>buildDailyMessages</code>{' '}
            自己的 return 则会结束整个列表处理函数，所以应该在循环结束后执行。
          </p>
          <CodeDemonstration
            title="完整案例与错误对照：return 放在哪里很重要"
            cases={messageCases}
          />
          <Note title="空列表也有明确的结果">
            <p>
              输入 [] 时，循环执行零轮，但准备 messages 和最后的 return 仍然执行，因此返回
              []。每次函数调用都会准备新的结果数组，不会把上一次的消息混进来。
            </p>
          </Note>
        </div>,
        <div key="review">
          <p>
            本课从“一份资料”走到“一组资料”，再从“处理一项”走到“逐项处理”。对象、数组与循环分别解决不同的问题，可以配合使用。
          </p>
          <KnowledgeTable
            caption="把容易混淆的概念放在一起比较"
            headers={['容易混淆的两项', '区别']}
            rows={[
              ['对象 / 数组', '对象按属性名组织相关资料；数组按位置组织一组元素'],
              ['Resident / Resident[]', '一份资料的类型 / 一组这种资料的类型'],
              ['下标 / length', '下标表示位置，从 0 开始；length 表示元素个数'],
              ['person / residents', '本轮取出的一个对象 / 全部对象组成的数组'],
              ['循环体内 / 循环结束后', '每一项重复执行 / 全部处理完后继续执行'],
              ['string / string[]', '一条文字 / 多条文字组成的列表'],
              ['打印 / 收集 / 返回', '显示给人看 / 存入结果数组 / 交回函数调用处'],
            ]}
          />
          <Note title="用一条线串起完整案例">
            <p>
              对象把字段组织起来 → 数组保存多份对象 → 循环逐个取出对象 → 调用函数计算消息 → push
              收集文字 → return 交回完整列表。
            </p>
          </Note>
          <p>
            类型不匹配会被类型检查发现；数组越界可能在运行时才暴露；return
            放早了则可能正常运行却只得到部分结果。判断程序是否正确，需要看清这三个不同层面。
          </p>
        </div>,
      ]}
    />
  );
}
