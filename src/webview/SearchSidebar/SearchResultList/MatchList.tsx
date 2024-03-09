import { CodeBlock } from './CodeBlock'
import { MatchActions } from './Actions'
import type { DisplayResult } from '../../../types'

import { memo } from 'react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  codeItem: {
    display: 'flex',
    paddingLeft: '38px',
    listStyle: 'none',
    ':hover': {
      background: 'var( --vscode-list-hoverBackground)',
    },
    // a hack to avoid setHover state, see also Actions.tsx
    // https://github.com/facebook/stylex/issues/373
    ':hover > .actions': {
      width: 'auto',
    },
  },
})

interface CodeBlockListProps {
  matches: DisplayResult[]
}
export const MatchList = memo(({ matches }: CodeBlockListProps) => {
  return (
    <>
      {matches?.map(match => {
        const { file, range } = match
        const { byteOffset } = range
        return (
          <li
            {...stylex.props(styles.codeItem)}
            key={file + byteOffset.start + byteOffset.end}
          >
            <CodeBlock match={match} />
            <MatchActions className="actions" match={match} />
          </li>
        )
      })}
    </>
  )
})
