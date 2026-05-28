export const mockQuestions = {
  'python-dev': {
    easy: [
      {
        id: 'py-ez-1',
        question: 'What is the main difference between a list and a tuple in Python, and when would you prefer to use one over the other?',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['mutable', 'immutable', 'syntax', 'performance', 'memory', 'tuple', 'list'],
        suggestedTopics: ['Python Data Structures', 'Memory Optimization', 'Mutability vs Immutability'],
        adaptiveFollowUp: {
          easier: 'Can you give a simple example of a mutable object in Python and explain what happens when we modify it?',
          harder: 'How does the immutability of a tuple affect its memory allocation and performance when compared to a list in Python?'
        }
      },
      {
        id: 'py-ez-2',
        question: 'What are list comprehensions in Python? Can you explain their syntax and provide a simple example compared to a standard for-loop?',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['syntax', 'readable', 'expression', 'loop', 'comprehension', 'iterable'],
        suggestedTopics: ['Pythonic Code', 'Functional Programming', 'Iterators'],
        adaptiveFollowUp: {
          easier: 'What is a basic for-loop in Python, and how do we append items to a list inside it?',
          harder: 'How would you write a list comprehension that includes a conditional if-else check, and what is its performance benefit?'
        }
      }
    ],
    medium: [
      {
        id: 'py-med-1',
        question: 'Explain how Python decorators work, what a closure is, and provide a practical use-case (such as logging or caching).',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['closure', 'wrapper', 'higher-order', 'function', 'syntax sugar', 'arguments', 'functools', 'wraps'],
        suggestedTopics: ['Decorators & Closures', 'Higher-Order Functions', 'Code Reusability'],
        adaptiveFollowUp: {
          easier: 'What does it mean for a function to be a "first-class citizen" in Python?',
          harder: 'How would you write a decorator that accepts arguments itself (a decorator factory), and why is functools.wraps important?'
        }
      },
      {
        id: 'py-med-2',
        question: 'What is the difference between `__init__` and `__new__` methods in Python OOP, and how are they used in class instantiation?',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['new', 'init', 'constructor', 'instantiation', 'instance', 'cls', 'self', 'immutable'],
        suggestedTopics: ['Object-Oriented Python', 'Dunder Methods', 'Metaprogramming'],
        adaptiveFollowUp: {
          easier: 'What is the purpose of the `self` keyword in Python class methods?',
          harder: 'How would you use the `__new__` method to implement a Singleton design pattern in Python?'
        }
      }
    ],
    hard: [
      {
        id: 'py-hrd-1',
        question: 'Explain the Global Interpreter Lock (GIL) in CPython. How does it affect multi-threading vs multi-processing, and how do you achieve true concurrency in CPU-bound tasks?',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['gil', 'cpython', 'thread', 'multiprocessing', 'concurrency', 'cpu-bound', 'io-bound', 'asyncio', 'context switch'],
        suggestedTopics: ['Concurrency Models', 'GIL Internals', 'AsyncIO & Multiprocessing'],
        adaptiveFollowUp: {
          easier: 'What is the difference between a thread and a process in an operating system?',
          harder: 'Explain how Python\'s `asyncio` loop manages task execution under the hood, and how it differs from traditional OS-level thread preemption.'
        }
      },
      {
        id: 'py-hrd-2',
        question: 'How does Python\'s garbage collection work under the hood? Explain reference counting, generational garbage collection, and how to handle circular references.',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['garbage collection', 'reference counting', 'generational', 'circular reference', 'gc module', 'memory leak', 'weakref'],
        suggestedTopics: ['Garbage Collection', 'Memory Management', 'Reference Cycles'],
        adaptiveFollowUp: {
          easier: 'What is a memory leak, and how does it happen in high-level programming languages?',
          harder: 'How can you use Python\'s `weakref` module to prevent reference cycles in a tree structure?'
        }
      }
    ]
  },
  'frontend-dev': {
    easy: [
      {
        id: 'fe-ez-1',
        question: 'What is the Virtual DOM in React? How does React use it to optimize rendering performance under the hood?',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['virtual dom', 'reconciliation', 'diffing', 'render', 'real dom', 'performance', 'state change', 'batching'],
        suggestedTopics: ['React Fundamentals', 'Virtual DOM', 'Reconciliation'],
        adaptiveFollowUp: {
          easier: 'What is the standard browser DOM, and why is direct manipulation of it considered slow?',
          harder: 'How does React\'s Fiber architecture improve the reconciliation process compared to the old stack reconciler?'
        }
      },
      {
        id: 'fe-ez-2',
        question: 'Explain the difference between state and props in React. Can you modify props? Why or why not?',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['state', 'props', 'immutable', 'component', 'unidirectional', 'data flow', 'rerender'],
        suggestedTopics: ['React State vs Props', 'Data Flow', 'Functional Components'],
        adaptiveFollowUp: {
          easier: 'How do you create state in a React functional component using a hook?',
          harder: 'What is prop drilling, and what are three primary strategies to solve it in a large-scale React app?'
        }
      }
    ],
    medium: [
      {
        id: 'fe-med-1',
        question: 'What are React hooks, why were they introduced, and what are the two absolute rules of using hooks in React components?',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['hooks', 'rules of hooks', 'top level', 'react function', 'useState', 'useEffect', 'functional component', 'stateful logic'],
        suggestedTopics: ['React Hooks', 'Functional Components', 'Hooks lifecycle'],
        adaptiveFollowUp: {
          easier: 'What is the `useEffect` hook, and how do you run code only once when a component mounts?',
          harder: 'How does React internally keep track of hook states across renders, and why does breaking the order of hooks cause errors?'
        }
      },
      {
        id: 'fe-med-2',
        question: 'Explain the event loop in JavaScript. What is the difference between the call stack, microtask queue, and macrotask (callback) queue?',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['event loop', 'call stack', 'microtask', 'macrotask', 'promise', 'settimeout', 'async', 'single-threaded'],
        suggestedTopics: ['JavaScript Event Loop', 'Asynchronous JS', 'Promises & Execution Context'],
        adaptiveFollowUp: {
          easier: 'What does it mean that JavaScript is a single-threaded language?',
          harder: 'Write the order of execution for a block containing sync code, `setTimeout(0)`, and a resolved `Promise.then()` block.'
        }
      }
    ],
    hard: [
      {
        id: 'fe-hrd-1',
        question: 'How do you optimize a large-scale React application\'s rendering performance? Explain strategies like code-splitting, memoization, and managing state boundaries.',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['usememo', 'usecallback', 'react.memo', 'code splitting', 'lazy', 'suspense', 'virtualization', 're-render', 'dependency array'],
        suggestedTopics: ['Performance Tuning', 'Code Splitting & Suspense', 'Memoization'],
        adaptiveFollowUp: {
          easier: 'What is the purpose of the dependency array in `useEffect` and `useMemo` hooks?',
          harder: 'How can you implement custom context throttling or use specialized libraries like Recoil or Zustand to bypass the global context re-render issue?'
        }
      },
      {
        id: 'fe-hrd-2',
        question: 'Explain the concept of Server-Side Rendering (SSR) vs Static Site Generation (SSG) in modern frameworks like Next.js. What is hydration, and how does it work?',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['ssr', 'ssg', 'hydration', 'seo', 'next.js', 'static generation', 'server components', 'performance', 'cumulative layout shift'],
        suggestedTopics: ['Rendering Paradigms', 'Next.js & SSR', 'Hydration Internals'],
        adaptiveFollowUp: {
          easier: 'What is Client-Side Rendering (CSR), and what is its main drawback for SEO?',
          harder: 'What is React Server Components (RSC) and how does it fundamentally differ from traditional SSR in terms of bundle size and component hydration?'
        }
      }
    ]
  },
  'backend-dev': {
    easy: [
      {
        id: 'be-ez-1',
        question: 'What is database indexing? How does it speed up queries, and what is the potential cost or overhead associated with indexes?',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['index', 'b-tree', 'lookup', 'write overhead', 'insert', 'update', 'read performance', 'storage'],
        suggestedTopics: ['Database Indexing', 'SQL Queries', 'Storage Mechanisms'],
        adaptiveFollowUp: {
          easier: 'What is a Primary Key in a SQL database, and does it automatically have an index?',
          harder: 'How does a composite index work in database engines, and why does the column order in the index definition matter for query matching?'
        }
      },
      {
        id: 'be-ez-2',
        question: 'Explain the difference between a GET request and a POST request in HTTP, including security, payload, and caching behavior.',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['get', 'post', 'http methods', 'payload', 'body', 'caching', 'idempotent', 'security'],
        suggestedTopics: ['HTTP Protocol', 'RESTful Services', 'Web Standards'],
        adaptiveFollowUp: {
          easier: 'What is the purpose of HTTP status codes, and what does a 404 code mean?',
          harder: 'What does "idempotence" mean in REST APIs, and which standard HTTP methods are considered idempotent?'
        }
      }
    ],
    medium: [
      {
        id: 'be-med-1',
        question: 'Explain the differences between Relational (SQL) and Non-Relational (NoSQL) databases. In what scenarios would you choose one over the other?',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['relational', 'nosql', 'acid', 'schema', 'joins', 'scalability', 'horizontal', 'vertical', 'document store', 'sharding'],
        suggestedTopics: ['SQL vs NoSQL', 'System Architecture', 'Database Normalization'],
        adaptiveFollowUp: {
          easier: 'What does ACID stand for, and why is it important in database transactions?',
          harder: 'How does CAP theorem apply to database selection, and how do MongoDB (CP) and Cassandra (AP) handle partition tolerance?'
        }
      },
      {
        id: 'be-med-2',
        question: 'What is JWT (JSON Web Token)? How is it structured, and how do you securely implement token-based authentication including refreshing expired tokens?',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['jwt', 'header', 'payload', 'signature', 'base64', 'refresh token', 'access token', 'stateless', 'xss', 'csrf'],
        suggestedTopics: ['Web Security', 'Token Authentication', 'JWT Architectures'],
        adaptiveFollowUp: {
          easier: 'What is the difference between Authentication and Authorization?',
          harder: 'How does a stateless JWT system handle user logouts or token revocations prior to token expiration without database lookups?'
        }
      }
    ],
    hard: [
      {
        id: 'be-hrd-1',
        question: 'Describe the architecture of a high-throughput, real-time notification system that can handle 10,000 push notifications per second. What components would you use?',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['redis', 'pub/sub', 'message queue', 'websocket', 'scalability', 'rabbitmq', 'kafka', 'load balancer', 'horizontal scaling', 'microservices'],
        suggestedTopics: ['System Design', 'Message Queues', 'Real-Time Architectures'],
        adaptiveFollowUp: {
          easier: 'What is a message queue, and how does it help in decoupling backend operations?',
          harder: 'How would you handle dynamic connection scaling and session sticky routing for millions of concurrent WebSocket connections?'
        }
      },
      {
        id: 'be-hrd-2',
        question: 'What is database sharding? How does it differ from replication, and what challenges (such as cross-shard joins) do you face when implementing it?',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['sharding', 'replication', 'horizontal partitioning', 'shard key', 'cross-shard joins', 'distributed transactions', 'routing'],
        suggestedTopics: ['Database Sharding', 'Distributed Databases', 'High Availability'],
        adaptiveFollowUp: {
          easier: 'What is the difference between master-slave replication and multi-master replication?',
          harder: 'Explain how Consistent Hashing is used in distributed caching and storage rings to minimize key redistribution when nodes are added or removed.'
        }
      }
    ]
  },
  'dsa': {
    easy: [
      {
        id: 'dsa-ez-1',
        question: 'What are Breadth-First Search (BFS) and Depth-First Search (DFS) in graph traversal? How do their queue and stack implementations differ, and when is one preferred?',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['bfs', 'dfs', 'queue', 'stack', 'shortest path', 'recursion', 'traversal', 'fifo', 'lifo'],
        suggestedTopics: ['Graph Algorithms', 'Traversals', 'Queue & Stack'],
        adaptiveFollowUp: {
          easier: 'What is a binary tree, and how is it represented in code?',
          harder: 'How do the space complexities of BFS and DFS compare when traversing a very deep tree versus a very wide tree?'
        }
      },
      {
        id: 'dsa-ez-2',
        question: 'What is Big-O notation? Can you explain the time and space complexity of sorting an array using QuickSort or MergeSort?',
        difficulty: 'easy',
        type: 'technical',
        keywords: ['big-o', 'complexity', 'quicksort', 'mergesort', 'worst case', 'average case', 'space complexity', 'n log n'],
        suggestedTopics: ['Asymptotic Analysis', 'Sorting Algorithms', 'Big-O Boundaries'],
        adaptiveFollowUp: {
          easier: 'What is the time complexity of searching an element in a sorted array using binary search?',
          harder: 'In what scenario does QuickSort degrade to O(N^2) time complexity, and how does pivot selection (like randomized pivot) prevent this?'
        }
      }
    ],
    medium: [
      {
        id: 'dsa-med-1',
        question: 'What is Dynamic Programming? How does it differ from a simple greedy approach, and what are the two main approaches: memoization and tabulation?',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['dynamic programming', 'greedy', 'memoization', 'tabulation', 'optimal substructure', 'overlapping subproblems', 'top-down', 'bottom-up'],
        suggestedTopics: ['Dynamic Programming', 'Memoization & Tabulation', 'Optimality Foundations'],
        adaptiveFollowUp: {
          easier: 'What is recursion, and what is a recursion stack overflow?',
          harder: 'How would you optimize the space complexity of a tabulation dynamic programming algorithm (like Fibonacci or 0/1 Knapsack) to O(1) or O(W)?'
        }
      },
      {
        id: 'dsa-med-2',
        question: 'Explain how a hash map works under the hood. What is a hash collision, and how can it be resolved (e.g., chaining vs open addressing)?',
        difficulty: 'medium',
        type: 'technical',
        keywords: ['hash map', 'hash function', 'collision', 'chaining', 'linked list', 'open addressing', 'load factor', 'constant time'],
        suggestedTopics: ['Hash Structures', 'Collision Resolution', 'Complexity Analysis'],
        adaptiveFollowUp: {
          easier: 'What is an array index, and how does it allow O(1) read operations?',
          harder: 'What is the amortized complexity of inserting into a hash map, and how does resizing the backing array impact this?'
        }
      }
    ],
    hard: [
      {
        id: 'dsa-hrd-1',
        question: 'Describe Dijkstra\'s algorithm for finding the shortest path in a weighted graph. What data structures are used, and what is its time complexity?',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['dijkstra', 'priority queue', 'min-heap', 'shortest path', 'weighted graph', 'greedy', 'time complexity', 'e log v'],
        suggestedTopics: ['Shortest Path Algorithms', 'Heaps & Priority Queues', 'Graph Structures'],
        adaptiveFollowUp: {
          easier: 'What is a weighted graph, and how does it differ from an unweighted graph?',
          harder: 'Why does Dijkstra\'s algorithm fail for graphs with negative edge weights, and which algorithm (like Bellman-Ford) should be used instead?'
        }
      },
      {
        id: 'dsa-hrd-2',
        question: 'Explain how you would detect a cycle in a directed graph using topological sorting. Can you describe Kahn\'s algorithm or the DFS approach?',
        difficulty: 'hard',
        type: 'technical',
        keywords: ['cycle detection', 'topological sort', 'kahn\'s', 'indegree', 'queue', 'dfs', 'back edge', 'dag'],
        suggestedTopics: ['Topological Sort', 'DAG Operations', 'Cycle Detection'],
        adaptiveFollowUp: {
          easier: 'What is a Directed Acyclic Graph (DAG)?',
          harder: 'How does the cycle detection algorithm change when dealing with an undirected graph versus a directed graph?'
        }
      }
    ]
  },
  'hr-interview': {
    easy: [
      {
        id: 'hr-ez-1',
        question: 'Tell me about yourself, your career path, and why you are interested in joining PrepWise.',
        difficulty: 'easy',
        type: 'hr',
        keywords: ['experience', 'passion', 'career path', 'growth', 'alignment', 'contribution', 'skills'],
        suggestedTopics: ['Professional Pitch', 'Career Goals', 'Company Alignment'],
        adaptiveFollowUp: {
          easier: 'What are one or two of your strongest soft skills, and how have they helped you in your work?',
          harder: 'How do you align your professional values with the culture and product trajectory of the company you are applying to?'
        }
      },
      {
        id: 'hr-ez-2',
        question: 'What do you consider your greatest strength and your primary area of improvement (weakness)? How do you work on improving the latter?',
        difficulty: 'easy',
        type: 'hr',
        keywords: ['strength', 'weakness', 'self-awareness', 'improvement', 'learning', 'growth mindset', 'proactive'],
        suggestedTopics: ['Self-Assessment', 'Growth Mindset', 'Continuous Improvement'],
        adaptiveFollowUp: {
          easier: 'Can you mention a tool or skill you learned recently to improve your work process?',
          harder: 'How does your primary weakness manifest in high-stress, fast-paced team scenarios, and what guardrails have you built to mitigate it?'
        }
      }
    ],
    medium: [
      {
        id: 'hr-med-1',
        question: 'Describe a situation where you had a significant disagreement or conflict with a coworker or project partner. How did you handle it, and what was the outcome?',
        difficulty: 'medium',
        type: 'hr',
        keywords: ['conflict', 'communication', 'empathy', 'resolution', 'listen', 'collaboration', 'constructive', 'compromise', 'professionalism'],
        suggestedTopics: ['Conflict Resolution', 'Interpersonal Skills', 'Emotional Intelligence'],
        adaptiveFollowUp: {
          easier: 'What do you think is the key to active listening during a normal conversation?',
          harder: 'If a teammate is completely non-cooperative and it threatens the delivery timeline of your project, at what point and how would you escalate the issue to leadership?'
        }
      },
      {
        id: 'hr-med-2',
        question: 'How do you manage tight deadlines and prioritize competing tasks when you are working under pressure?',
        difficulty: 'medium',
        type: 'hr',
        keywords: ['prioritization', 'deadline', 'stress', 'time management', 'communication', 'agile', 'kanban', 'collaboration'],
        suggestedTopics: ['Time Management', 'Prioritization Matrices', 'Stress Resilience'],
        adaptiveFollowUp: {
          easier: 'Do you prefer planning your daily tasks in the morning or the evening before, and what simple tool do you use?',
          harder: 'How do you handle scope creep when a manager suddenly adds a high-priority request to an already packed sprint?'
        }
      }
    ],
    hard: [
      {
        id: 'hr-hrd-1',
        question: 'Tell me about a time when you were working on a critical project, and it failed or went significantly off-track due to circumstances within or outside your control. What did you do, how did you communicate, and what were your key takeaways?',
        difficulty: 'hard',
        type: 'hr',
        keywords: ['failure', 'ownership', 'accountability', 'communication', 'pivot', 'learnings', 'reflection', 'post-mortem', 'resilience', 'mitigation'],
        suggestedTopics: ['Crisis Management', 'Extreme Ownership', 'Resilience & Learnings'],
        adaptiveFollowUp: {
          easier: 'How do you handle feedback or criticism when a supervisor reviews your work?',
          harder: 'How do you cultivate a team culture of "blameless post-mortems" after a critical system failure or major business loss?'
        }
      },
      {
        id: 'hr-hrd-2',
        question: 'Describe a situation where you had to lead a project or take the initiative without formal authority. How did you influence others and drive the project to completion?',
        difficulty: 'hard',
        type: 'hr',
        keywords: ['leadership', 'influence', 'initiative', 'ownership', 'persuasion', 'trust', 'collaboration', 'impact', 'stakeholder'],
        suggestedTopics: ['Influence without Authority', 'Leadership Qualities', 'Strategic Alignment'],
        adaptiveFollowUp: {
          easier: 'What does leadership mean to you in a team project context?',
          harder: 'How do you build consensus among senior engineering stakeholders who hold strong, conflicting opinions on system architecture?'
        }
      }
    ]
  }
};
