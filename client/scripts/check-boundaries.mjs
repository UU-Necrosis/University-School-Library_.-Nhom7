import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const CLIENT_HOOKS = new Set([
  'useState',
  'useEffect',
  'useContext',
  'useReducer',
  'useCallback',
  'useMemo',
  'useRef',
  'useImperativeHandle',
  'useLayoutEffect',
  'useInsertionEffect',
  'useTransition',
  'useDeferredValue',
  'useId',
  'useSyncExternalStore',
  'useActionState',
  'useOptimistic',
  // Next.js client navigation hooks
  'useRouter',
  'usePathname',
  'useSearchParams',
  'useParams',
  'useSelectedLayoutSegment',
  'useSelectedLayoutSegments',
  // App specific client hooks
  'useAuth',
]);

const APP_DIR = path.resolve('src/app');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

function hasUseClientDirective(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (ts.isExpressionStatement(stmt)) {
      if (ts.isStringLiteral(stmt.expression) && stmt.expression.text === 'use client') {
        return true;
      }
    } else {
      break;
    }
  }
  return false;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );

  const isClient = hasUseClientDirective(sourceFile);
  const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  const errors = [];
  const warnings = [];

  // Metadata check: Client components must not export metadata
  if (isClient) {
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isVariableStatement(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
        for (const decl of node.declarationList.declarations) {
          if (ts.isIdentifier(decl.name) && (decl.name.text === 'metadata' || decl.name.text === 'generateMetadata')) {
            const { line } = sourceFile.getLineAndCharacterOfPosition(decl.getStart());
            errors.push(`[Line ${line + 1}] Client Component cannot export "${decl.name.text}". Move metadata to a Server Component parent or layout.`);
          }
        }
      }
      if (ts.isFunctionDeclaration(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
        if (node.name && node.name.text === 'generateMetadata') {
          const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
          errors.push(`[Line ${line + 1}] Client Component cannot export "generateMetadata".`);
        }
      }
    });
  }

  // Server Component boundary check for App Router entry files
  const isAppEntry = /src\/app\/.*(page|layout|template|error|not-found)\.tsx$/.test(relPath);
  if (isAppEntry && !isClient) {
    // Check for client hooks in Server Component
    function visit(node) {
      if (ts.isImportDeclaration(node)) {
        const namedBindings = node.importClause?.namedBindings;
        if (namedBindings && ts.isNamedImports(namedBindings)) {
          for (const specifier of namedBindings.elements) {
            const importedName = specifier.propertyName ? specifier.propertyName.text : specifier.name.text;
            if (CLIENT_HOOKS.has(importedName)) {
              const { line } = sourceFile.getLineAndCharacterOfPosition(specifier.getStart());
              errors.push(
                `[Line ${line + 1}] Server Component imports client hook "${importedName}". Add "use client" or extract into an interactive Client Component.`
              );
            }
          }
        }
      }

      if (ts.isCallExpression(node)) {
        const expr = node.expression;
        if (ts.isIdentifier(expr) && CLIENT_HOOKS.has(expr.text)) {
          const { line } = sourceFile.getLineAndCharacterOfPosition(expr.getStart());
          errors.push(
            `[Line ${line + 1}] Server Component calls client hook "${expr.text}()". Add "use client" or move hook into a Client Component.`
          );
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  }

  return { relPath, isClient, errors, warnings };
}

function main() {
  console.log('🔍 Kiểm tra Server/Client Component Boundaries theo cấu trúc AST...');
  const appFiles = walk(APP_DIR);
  let totalErrors = 0;
  let checkedCount = 0;

  for (const file of appFiles) {
    checkedCount++;
    const { relPath, errors, warnings } = checkFile(file);
    if (errors.length > 0) {
      totalErrors += errors.length;
      console.error(`\n❌ Lỗi tại ${relPath}:`);
      for (const err of errors) {
        console.error(`   ${err}`);
      }
    }
    if (warnings.length > 0) {
      console.warn(`\n⚠️ Cảnh báo tại ${relPath}:`);
      for (const warn of warnings) {
        console.warn(`   ${warn}`);
      }
    }
  }

  if (totalErrors > 0) {
    console.error(`\n💥 Phát hiện ${totalErrors} vi phạm ranh giới Server/Client trong ${checkedCount} tệp.`);
    process.exit(1);
  } else {
    console.log(`\n✅ Tất cả ${checkedCount} tệp App Router đều tuân thủ đúng chuẩn ranh giới Server/Client!`);
  }
}

main();
