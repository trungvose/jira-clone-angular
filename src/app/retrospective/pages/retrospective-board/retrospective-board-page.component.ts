import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';

import { RetrospectiveService } from '../../state/retrospective.service';
import { RetrospectiveQuery } from '../../state/retrospective.query';
import { AuthQuery } from '../../../project/auth/auth.query';
import { ProjectQuery } from '../../../project/state/project/project.query';
import { RetrospectiveBoard, StickyNote, StickyNoteColor, RetroPhase, RetroColumn } from '../../interfaces/retrospective.interface';
import { RetroColumnComponent } from '../../components/retro-column/retro-column.component';
import { JiraControlModule } from '../../../jira-control/jira-control.module';
import { JUser } from '../../../interface/user';

@Component({
  selector: 'app-retrospective-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TextFieldModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzStepsModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzToolTipModule,
    NzDividerModule,
    NzAvatarModule,
    DragDropModule,
    RetroColumnComponent,
    JiraControlModule
  ],
  templateUrl: './retrospective-board-page.component.html',
  styleUrls: ['./retrospective-board-page.component.scss']
})
export class RetrospectiveBoardPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Make RetroPhase enum available in template
  RetroPhase = RetroPhase;
  
  currentBoard: RetrospectiveBoard | null = null;
  columnDataArrays: { [columnId: string]: StickyNote[] } = {};
  
  isPhaseModalVisible = false;
  isSettingsModalVisible = false;
  isParticipantsModalVisible = false;
  selectedPhase: RetroPhase = RetroPhase.BRAINSTORMING;
  settingsTitle = '';
  settingsDescription = '';
  
  // User data
  users: JUser[] = [];
  participantUsers: JUser[] = [];

  phaseOptions = [
    { value: RetroPhase.BRAINSTORMING, label: 'Brainstorming', icon: 'bulb' },
    { value: RetroPhase.GROUPING, label: 'Grouping', icon: 'group' },
    { value: RetroPhase.VOTING, label: 'Voting', icon: 'like' },
    { value: RetroPhase.DISCUSSION, label: 'Discussion', icon: 'message' },
    { value: RetroPhase.ACTION_ITEMS, label: 'Action Items', icon: 'check-circle' },
    { value: RetroPhase.COMPLETED, label: 'Completed', icon: 'check' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private retrospectiveService: RetrospectiveService,
    private retrospectiveQuery: RetrospectiveQuery,
    private authQuery: AuthQuery,
    private projectQuery: ProjectQuery,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    // Get board ID from route
    const boardId = this.route.snapshot.paramMap.get('id');
    
    if (boardId) {
      this.retrospectiveService.loadBoard(boardId);
    }

    // Subscribe to users
    this.projectQuery.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.users = users;
        this.updateParticipantUsers();
      });

    // Subscribe to current board
    this.retrospectiveQuery.currentBoard$
      .pipe(takeUntil(this.destroy$))
      .subscribe(board => {
        this.currentBoard = board;
        if (board) {
          this.selectedPhase = board.currentPhase;
          this.settingsTitle = board.title;
          this.settingsDescription = board.description;
          
          // Initialize column data arrays for drag & drop
          this.initializeColumnArrays();
          
          // Update participant users when board changes
          this.updateParticipantUsers();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.router.navigate(['/project/retrospective']);
  }

  getCurrentUserId(): string {
    return this.authQuery.getValue()?.id || '';
  }

  getStickyNotesForColumn(columnId: string): StickyNote[] {
    return this.columnDataArrays[columnId] || [];
  }

  private initializeColumnArrays() {
    if (!this.currentBoard) return;
    
    // Initialize empty arrays for each column
    this.columnDataArrays = {};
    this.currentBoard.columns.forEach(column => {
      this.columnDataArrays[column.id] = [];
    });
    
    // Populate arrays with current notes
    this.currentBoard.stickyNotes.forEach(note => {
      if (this.columnDataArrays[note.columnId]) {
        this.columnDataArrays[note.columnId].push(note);
      }
    });
    
    // Sort notes by position within each column
    Object.keys(this.columnDataArrays).forEach(columnId => {
      this.columnDataArrays[columnId].sort((a, b) => a.position.y - b.position.y);
    });
  }

  trackByColumnId(index: number, column: RetroColumn): string {
    return column.id;
  }

  // Phase Management
  getCurrentPhaseStep(): number {
    if (!this.currentBoard) return 0;
    
    const phaseSteps = {
      [RetroPhase.BRAINSTORMING]: 0,
      [RetroPhase.GROUPING]: 1,
      [RetroPhase.VOTING]: 2,
      [RetroPhase.DISCUSSION]: 3,
      [RetroPhase.ACTION_ITEMS]: 4,
      [RetroPhase.COMPLETED]: 4
    };
    
    return phaseSteps[this.currentBoard.currentPhase] || 0;
  }

  getPhaseColor(phase: RetroPhase): string {
    const colors = {
      [RetroPhase.BRAINSTORMING]: 'blue',
      [RetroPhase.GROUPING]: 'cyan',
      [RetroPhase.VOTING]: 'purple',
      [RetroPhase.DISCUSSION]: 'orange',
      [RetroPhase.ACTION_ITEMS]: 'green',
      [RetroPhase.COMPLETED]: 'default'
    };
    return colors[phase] || 'default';
  }

  getPhaseLabel(phase: RetroPhase): string {
    const labels = {
      [RetroPhase.BRAINSTORMING]: 'Brainstorming',
      [RetroPhase.GROUPING]: 'Grouping',
      [RetroPhase.VOTING]: 'Voting', 
      [RetroPhase.DISCUSSION]: 'Discussion',
      [RetroPhase.ACTION_ITEMS]: 'Action Items',
      [RetroPhase.COMPLETED]: 'Completed'
    };
    return labels[phase] || 'Unknown';
  }

  getPhaseIcon(phase: RetroPhase): string {
    const icons = {
      [RetroPhase.BRAINSTORMING]: 'bulb',
      [RetroPhase.GROUPING]: 'group',
      [RetroPhase.VOTING]: 'like',
      [RetroPhase.DISCUSSION]: 'message',
      [RetroPhase.ACTION_ITEMS]: 'check-circle',
      [RetroPhase.COMPLETED]: 'check'
    };
    return icons[phase] || 'question';
  }

  getPhaseInstructions(phase: RetroPhase): string {
    const instructions = {
      [RetroPhase.BRAINSTORMING]: 'Add sticky notes with your thoughts about what went well, what could be improved, and action items for the next sprint.',
      [RetroPhase.GROUPING]: 'Group similar ideas together by dragging notes close to each other. This helps identify common themes.',
      [RetroPhase.VOTING]: 'Vote on the most important items by clicking the like button. Focus on what matters most to the team.',
      [RetroPhase.DISCUSSION]: 'Discuss the highest-voted items. Share perspectives and dive deeper into the key topics.',
      [RetroPhase.ACTION_ITEMS]: 'Define concrete action items based on your discussion. Assign owners and set deadlines.',
      [RetroPhase.COMPLETED]: 'Retrospective completed! Review the action items and plan for the next retrospective.'
    };
    return instructions[phase] || '';
  }

  getPhaseDescription(phase: RetroPhase): string {
    return this.getPhaseInstructions(phase);
  }

  getPhaseTitle(phase: RetroPhase): string {
    return this.getPhaseLabel(phase);
  }

  getPhaseShortDescription(phase: RetroPhase): string {
    const descriptions = {
      [RetroPhase.BRAINSTORMING]: 'Share thoughts & ideas',
      [RetroPhase.GROUPING]: 'Organize similar notes',
      [RetroPhase.VOTING]: 'Vote on key topics',
      [RetroPhase.DISCUSSION]: 'Discuss & collaborate',
      [RetroPhase.ACTION_ITEMS]: 'Create action plan',
      [RetroPhase.COMPLETED]: 'Review & complete'
    };
    return descriptions[phase] || '';
  }

  getPhaseTooltip(phase: RetroPhase): string {
    if (this.currentBoard?.currentPhase === phase) {
      return 'Current phase - ' + this.getPhaseInstructions(phase);
    }
    if (this.isPhaseCompleted(phase)) {
      return 'Completed - Click to return to this phase';
    }
    return 'Click to move to this phase - ' + this.getPhaseInstructions(phase);
  }

  isPhaseCompleted(phase: RetroPhase): boolean {
    if (!this.currentBoard) return false;
    
    const phaseOrder = [
      RetroPhase.BRAINSTORMING,
      RetroPhase.GROUPING,
      RetroPhase.VOTING,
      RetroPhase.DISCUSSION,
      RetroPhase.ACTION_ITEMS,
      RetroPhase.COMPLETED
    ];
    
    const currentIndex = phaseOrder.indexOf(this.currentBoard.currentPhase);
    const targetIndex = phaseOrder.indexOf(phase);
    
    return targetIndex < currentIndex;
  }

  canChangePhase(): boolean {
    // In a real app, you might check if the user is a facilitator
    return true;
  }

  isPhaseClickable(phase: RetroPhase): boolean {
    if (!this.currentBoard || !this.canChangePhase()) {
      return false;
    }

    // Current phase is not clickable (already there)
    if (this.currentBoard.currentPhase === phase) {
      return false;
    }

    // Get the phase order
    const phases = this.retroPhases;
    const currentPhaseIndex = phases.indexOf(this.currentBoard.currentPhase);
    const targetPhaseIndex = phases.indexOf(phase);

    // Can only move backward (to completed phases) or forward to immediate next phase
    return targetPhaseIndex < currentPhaseIndex || targetPhaseIndex === currentPhaseIndex + 1;
  }

  changePhase(phase: RetroPhase) {
    if (!this.isPhaseClickable(phase)) {
      return;
    }

    // Special handling for GROUPING phase - offer AI assistance
    if (phase === RetroPhase.GROUPING && this.currentBoard?.currentPhase === RetroPhase.BRAINSTORMING) {
      this.modal.confirm({
        nzTitle: `Switch to ${this.getPhaseTitle(phase)} Phase?`,
        nzContent: `
          <div style="margin-bottom: 12px;">
            <strong>Switching to Grouping phase will:</strong>
            <ul style="margin-top: 8px; padding-left: 20px;">
              <li>Disable adding new notes</li>
              <li>Allow moving notes between columns</li>
              <li>Keep author information hidden</li>
            </ul>
          </div>
          <div style="margin-top: 16px; padding: 12px; background: linear-gradient(135deg, #7954AA 0%, #5a3d82 100%); border-radius: 8px; color: white;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 18px;">💡</span>
              <strong>AI-Powered Grouping Available!</strong>
            </div>
            <p style="margin: 0; font-size: 13px; opacity: 0.95;">
              Would you like AI to automatically analyze and group similar notes with tags?
            </p>
          </div>
        `,
        nzOkText: '✨ Use AI Grouping',
        nzOkType: 'primary',
        nzCancelText: 'Switch Without AI',
        nzOnOk: () => {
          this.retrospectiveService.updatePhase(phase);
          setTimeout(() => this.performAIGrouping(), 500);
        },
        nzOnCancel: () => {
          this.retrospectiveService.updatePhase(phase);
        }
      });
      return;
    }

    // Show confirmation modal for other phases
    this.modal.confirm({
      nzTitle: `Switch to ${this.getPhaseTitle(phase)} Phase?`,
      nzContent: this.getPhaseChangeWarning(phase),
      nzOkText: 'Yes, Switch Phase',
      nzOkType: 'primary',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.retrospectiveService.updatePhase(phase);
      }
    });
  }

  getPhaseChangeWarning(phase: RetroPhase): string {
    const currentPhase = this.currentBoard?.currentPhase;
    
    // Generate contextual warnings based on current and target phase
    const warnings: { [key: string]: string } = {
      [RetroPhase.BRAINSTORMING]: `
        <div style="margin-bottom: 12px;">
          <strong>Switching to Brainstorming phase will:</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Allow adding and editing notes</li>
            <li>Enable note deletion</li>
            <li>Disable voting functionality</li>
            <li>Hide author information for privacy</li>
          </ul>
        </div>
      `,
      [RetroPhase.GROUPING]: `
        <div style="margin-bottom: 12px;">
          <strong>Switching to Grouping phase will:</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Disable adding new notes</li>
            <li>Disable editing and deleting notes</li>
            <li>Allow moving notes between columns</li>
            <li>Keep author information hidden</li>
          </ul>
        </div>
      `,
      [RetroPhase.VOTING]: `
        <div style="margin-bottom: 12px;">
          <strong>Switching to Voting phase will:</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Disable editing and moving notes</li>
            <li>Enable voting on notes</li>
            <li>Keep author information hidden</li>
            <li>Focus on prioritizing key topics</li>
          </ul>
        </div>
      `,
      [RetroPhase.DISCUSSION]: `
        <div style="margin-bottom: 12px;">
          <strong>Switching to Discussion phase will:</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Disable all note modifications</li>
            <li>Reveal author information</li>
            <li>Show voting results</li>
            <li>Focus on discussing high-priority items</li>
          </ul>
        </div>
      `,
      [RetroPhase.ACTION_ITEMS]: `
        <div style="margin-bottom: 12px;">
          <strong>Switching to Action Items phase will:</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Disable all note modifications</li>
            <li>Show all author information</li>
            <li>Focus on creating action plans</li>
            <li>Prepare for retrospective completion</li>
          </ul>
        </div>
      `,
      [RetroPhase.COMPLETED]: `
        <div style="margin-bottom: 12px;">
          <strong>Completing this retrospective will:</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Lock all modifications</li>
            <li>Make the board read-only</li>
            <li>Preserve all data for review</li>
            <li style="color: #ef4444; font-weight: 500;">⚠️ This cannot be easily undone</li>
          </ul>
        </div>
      `
    };

    return warnings[phase] || 'Are you sure you want to switch to this phase?';
  }

  showPhaseModal() {
    this.isPhaseModalVisible = true;
  }

  updatePhase() {
    this.retrospectiveService.updatePhase(this.selectedPhase);
    this.isPhaseModalVisible = false;
  }

  cancelPhaseUpdate() {
    this.isPhaseModalVisible = false;
    if (this.currentBoard) {
      this.selectedPhase = this.currentBoard.currentPhase;
    }
  }

  showSettingsModal() {
    this.isSettingsModalVisible = true;
  }

  saveSettings() {
    // In a real app, you would update the board settings via the service
    console.log('Saving settings:', { title: this.settingsTitle, description: this.settingsDescription });
    this.isSettingsModalVisible = false;
  }

  cancelSettings() {
    this.isSettingsModalVisible = false;
    if (this.currentBoard) {
      this.settingsTitle = this.currentBoard.title;
      this.settingsDescription = this.currentBoard.description;
    }
  }

  // Participant helpers
  updateParticipantUsers(): void {
    if (!this.currentBoard || !this.users.length) {
      this.participantUsers = [];
      return;
    }
    
    this.participantUsers = this.currentBoard.participants
      .map(participantId => this.users.find(user => user.id === participantId))
      .filter(user => user !== undefined) as JUser[];
  }

  getParticipantAvatar(participantId: string): string | undefined {
    const user = this.users.find(u => u.id === participantId);
    return user?.avatarUrl;
  }

  getParticipantInitials(participantId: string): string {
    const user = this.users.find(u => u.id === participantId);
    if (!user?.name) return participantId.slice(0, 2).toUpperCase();
    return user.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getParticipantName(participantId: string): string {
    const user = this.users.find(u => u.id === participantId);
    return user?.name || `User ${participantId}`;
  }
  
  showParticipantsModal(): void {
    this.isParticipantsModalVisible = true;
  }
  
  closeParticipantsModal(): void {
    this.isParticipantsModalVisible = false;
  }
  
  isFacilitator(userId: string): boolean {
    return this.currentBoard?.facilitatorId === userId;
  }

  // Note event handlers
  onNoteAdd(data: { columnId: string, content: string, color: StickyNoteColor, isAnonymous: boolean }) {
    this.retrospectiveService.addStickyNote(data.columnId, data.content, data.color, data.isAnonymous);
    // Reinitialize arrays after adding note
    setTimeout(() => this.initializeColumnArrays(), 100);
  }

  onNoteChange(note: StickyNote) {
    this.retrospectiveService.updateStickyNote(note.id, note);
    setTimeout(() => this.initializeColumnArrays(), 100);
  }

  onNoteDelete(noteId: string) {
    this.retrospectiveService.deleteStickyNote(noteId);
    setTimeout(() => this.initializeColumnArrays(), 100);
  }

  onNoteVote(noteId: string) {
    this.retrospectiveService.voteOnStickyNote(noteId);
  }

  onNoteDrop(event: CdkDragDrop<StickyNote[]>) {
    const draggedNote = event.item.data as StickyNote;
    
    if (event.previousContainer === event.container) {
      // Same column - reorder notes
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
      // Update positions for all notes in the column
      event.container.data.forEach((note, index) => {
        this.retrospectiveService.updateStickyNote(note.id, {
          position: { x: note.position.x, y: index * 120 + 10 },
          updatedAt: new Date().toISOString()
        });
      });
    } else {
      // Different column - transfer note
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      // Get the new column ID from the container ID
      const newColumnId = event.container.id.replace('drop-list-', '');
      
      if (draggedNote && newColumnId && newColumnId !== draggedNote.columnId) {
        // Update the note's column and position
        this.retrospectiveService.updateStickyNote(draggedNote.id, {
          columnId: newColumnId,
          position: {
            x: 0,
            y: event.currentIndex * 120 + 10
          },
          updatedAt: new Date().toISOString()
        });
        
        // Update positions for all notes in both columns
        event.previousContainer.data.forEach((note, index) => {
          this.retrospectiveService.updateStickyNote(note.id, {
            position: { x: note.position.x, y: index * 120 + 10 },
            updatedAt: new Date().toISOString()
          });
        });
        
        event.container.data.forEach((note, index) => {
          this.retrospectiveService.updateStickyNote(note.id, {
            position: { x: note.position.x, y: index * 120 + 10 },
            updatedAt: new Date().toISOString()
          });
        });
      }
    }
  }

  // Phase management methods
  get retroPhases() {
    return Object.values(RetroPhase);
  }

  cancelPhaseChange() {
    this.isPhaseModalVisible = false;
    this.selectedPhase = this.currentBoard?.currentPhase || RetroPhase.BRAINSTORMING;
  }

  // AI Grouping functionality
  performAIGrouping() {
    if (!this.currentBoard) return;

    const notificationKey = `ai-grouping-${Date.now()}`;
    
    // Show loading notification
    this.modal.info({
      nzTitle: '🤖 AI Grouping in Progress',
      nzContent: `
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">
            <span style="display: inline-block; animation: spin 2s linear infinite;">🔄</span>
          </div>
          <p style="font-size: 14px; color: #6b7280;">
            Analyzing ${this.currentBoard.stickyNotes.length} notes across ${this.currentBoard.columns.length} columns...
          </p>
          <p style="font-size: 13px; color: #9ca3af; margin-top: 8px;">
            This may take a few moments
          </p>
          <style>
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          </style>
        </div>
      `,
      nzOkText: 'Working...',
      nzOkDisabled: true,
      nzClosable: false,
      nzMaskClosable: false
    });

    // Simulate AI processing (in production, this would call an AI service)
    setTimeout(() => {
      const groupedNotes = this.analyzeAndGroupNotes();
      
      // Apply the grouping
      groupedNotes.forEach(noteUpdate => {
        this.retrospectiveService.updateStickyNote(noteUpdate.noteId, {
          tags: noteUpdate.tags,
          groupId: noteUpdate.groupId
        });
      });

      // Close loading modal and show success
      this.modal.closeAll();
      
      setTimeout(() => {
        this.modal.success({
          nzTitle: '✨ AI Grouping Complete!',
          nzContent: `
            <div style="padding: 12px;">
              <p style="margin-bottom: 12px;">Successfully analyzed and grouped ${this.currentBoard?.stickyNotes.length} notes.</p>
              <div style="background: #f3f4f6; padding: 12px; border-radius: 8px; margin-top: 12px;">
                <strong style="display: block; margin-bottom: 8px;">Groups Identified:</strong>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px;">
                  ${this.getUniqueGroups().map(group => `<li>${group}</li>`).join('')}
                </ul>
              </div>
              <p style="margin-top: 12px; font-size: 13px; color: #6b7280;">
                Notes have been tagged and can now be easily grouped by dragging them together.
              </p>
            </div>
          `,
          nzOkText: 'Great!',
          nzWidth: 500
        });
      }, 100);
    }, 2500); // Simulate AI processing time
  }

  private analyzeAndGroupNotes(): Array<{ noteId: string; tags: string[]; groupId: string }> {
    if (!this.currentBoard) return [];

    const noteUpdates: Array<{ noteId: string; tags: string[]; groupId: string }> = [];
    
    // Group notes by column first
    const notesByColumn: { [columnId: string]: StickyNote[] } = {};
    this.currentBoard.stickyNotes.forEach(note => {
      if (!notesByColumn[note.columnId]) {
        notesByColumn[note.columnId] = [];
      }
      notesByColumn[note.columnId].push(note);
    });

    // Analyze each column separately
    Object.entries(notesByColumn).forEach(([columnId, notes]) => {
      const columnGroups = this.identifyGroupsInColumn(notes, columnId);
      noteUpdates.push(...columnGroups);
    });

    return noteUpdates;
  }

  private identifyGroupsInColumn(notes: StickyNote[], columnId: string): Array<{ noteId: string; tags: string[]; groupId: string }> {
    // Simple keyword-based grouping (in production, use NLP/AI service)
    const keywords = {
      'Communication': ['communication', 'talk', 'discuss', 'meeting', 'sync', 'share', 'update', 'inform'],
      'Process': ['process', 'workflow', 'procedure', 'system', 'method', 'approach', 'way'],
      'Technical': ['code', 'bug', 'technical', 'deploy', 'build', 'test', 'review', 'refactor', 'architecture'],
      'Team': ['team', 'collaboration', 'together', 'help', 'support', 'pair', 'cooperation'],
      'Documentation': ['document', 'docs', 'documentation', 'wiki', 'readme', 'guide', 'manual'],
      'Time': ['time', 'deadline', 'schedule', 'late', 'early', 'duration', 'speed', 'fast', 'slow'],
      'Quality': ['quality', 'improvement', 'better', 'improve', 'enhance', 'optimize', 'excellent'],
      'Planning': ['plan', 'planning', 'estimate', 'forecast', 'strategy', 'goal', 'objective'],
      'Tools': ['tool', 'platform', 'software', 'application', 'service', 'framework', 'library'],
      'Blocker': ['blocker', 'blocked', 'issue', 'problem', 'obstacle', 'challenge', 'difficulty']
    };

    const noteUpdates: Array<{ noteId: string; tags: string[]; groupId: string }> = [];

    notes.forEach(note => {
      const content = note.content.toLowerCase();
      const matchedTags: string[] = [];
      
      // Find matching keywords
      Object.entries(keywords).forEach(([category, words]) => {
        const hasMatch = words.some(word => content.includes(word.toLowerCase()));
        if (hasMatch) {
          matchedTags.push(category);
        }
      });

      // If no tags matched, assign a default tag
      if (matchedTags.length === 0) {
        matchedTags.push('General');
      }

      // Use the primary tag as the group ID
      const primaryTag = matchedTags[0];
      const groupId = `${columnId}-${primaryTag.toLowerCase().replace(/\s+/g, '-')}`;

      noteUpdates.push({
        noteId: note.id,
        tags: matchedTags.slice(0, 3), // Limit to 3 tags per note
        groupId: groupId
      });
    });

    return noteUpdates;
  }

  private getUniqueGroups(): string[] {
    if (!this.currentBoard) return [];

    const groups = new Set<string>();
    this.currentBoard.stickyNotes.forEach(note => {
      if (note.tags && note.tags.length > 0) {
        note.tags.forEach(tag => groups.add(tag));
      }
    });

    return Array.from(groups).sort();
  }
}
