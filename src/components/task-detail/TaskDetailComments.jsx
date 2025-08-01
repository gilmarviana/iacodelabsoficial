import React, { useState, useRef, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import AssigneeAvatar from '@/components/task-detail/AssigneeAvatar';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover';

const TaskDetailComments = ({ comments, onUpdate, assignees = [], clients = [], isReadOnly }) => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [mentionQuery, setMentionQuery] = useState('');
    const [showMentionPopover, setShowMentionPopover] = useState(false);
    const textareaRef = useRef(null);

    const allMentionables = useMemo(() => [
        ...assignees.map(a => ({ id: a.id, name: a.name, type: 'assignee' })),
        ...clients.map(c => ({ id: c.id, name: c.name, type: 'client' }))
    ], [assignees, clients]);

    const filteredMentionables = allMentionables.filter(m => 
        m.name.toLowerCase().includes(mentionQuery.toLowerCase())
    );

    const handleCommentChange = (e) => {
        const text = e.target.value;
        setNewComment(text);

        const cursorPos = e.target.selectionStart;
        const textUpToCursor = text.substring(0, cursorPos);
        const mentionMatch = textUpToCursor.match(/@(\w*)$/);

        if (mentionMatch) {
            setMentionQuery(mentionMatch[1]);
            setShowMentionPopover(true);
        } else {
            setShowMentionPopover(false);
        }
    };

    const handleMentionSelect = (name) => {
        const text = newComment;
        const cursorPos = textareaRef.current.selectionStart;
        const textUpToCursor = text.substring(0, cursorPos);
        
        const newText = textUpToCursor.replace(/@\S*$/, `@${name} `) + text.substring(cursorPos);
        
        setNewComment(newText);
        setShowMentionPopover(false);
        setTimeout(() => textareaRef.current.focus(), 0);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObject = {
                id: Date.now(),
                author: user?.name || 'Anônimo',
                text: newComment.trim(),
                createdAt: new Date().toISOString(),
            };
            onUpdate([...comments, newCommentObject]);
            setNewComment('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                {comments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-3">
                        <AssigneeAvatar assignee={comment.author} size="10" />
                        <div className="flex-1 bg-muted p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm">{comment.author}</p>
                                <p className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), "dd/MM HH:mm")}</p>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{comment.text.split(/(\s+)/).map((word, i) => word.startsWith('@') ? <strong key={i} className="text-primary">{word}</strong> : word)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-shrink-0 mt-4 flex items-start gap-3">
                <AssigneeAvatar assignee={user?.name} size="10" />
                <Popover open={showMentionPopover} onOpenChange={setShowMentionPopover}>
                    <div className="flex-1 relative">
                        <PopoverAnchor asChild>
                            <Textarea 
                                ref={textareaRef}
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Adicionar um comentário... Use @ para mencionar."
                                className="pr-12 resize-none"
                                disabled={isReadOnly}
                            />
                        </PopoverAnchor>
                        <Button size="icon" className="absolute right-2 bottom-2 h-8 w-8" onClick={handleAddComment} disabled={isReadOnly || !newComment.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    <PopoverContent className="w-[300px] p-1">
                        {filteredMentionables.length > 0 ? (
                            <div className="flex flex-col">
                                {filteredMentionables.map(mentionable => (
                                    <button 
                                        key={`${mentionable.type}-${mentionable.id}`} 
                                        onMouseDown={() => handleMentionSelect(mentionable.name)}
                                        className="text-left p-2 hover:bg-accent rounded-md"
                                    >
                                        {mentionable.name}
                                        <span className="text-xs text-muted-foreground ml-2">{mentionable.type === 'assignee' ? 'Dev' : 'Cliente'}</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-2 text-sm text-muted-foreground">Nenhum usuário encontrado.</div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default TaskDetailComments;