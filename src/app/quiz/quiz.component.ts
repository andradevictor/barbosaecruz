import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface Option {
  text: string;
  next?: number; // índice da próxima pergunta (ou conclusão)
}

interface Question {
  index: number;
  text: string;
  image?: string; // url do ícone
  options: Option[];
  isConclusion?: boolean; // true para nós finais / conclusões
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressBarModule],
  template: `
<div class="container quiz-wrap d-flex align-items-center justify-content-center">
  <mat-card class="quiz-card" [@slideAnimation]="currentIndex">
    <div class="header d-flex align-items-center justify-content-between mb-3">
      <div class="title">
        <h3 *ngIf="!currentQuestion.isConclusion; else conclTitle">Pergunta</h3>
        <ng-template #conclTitle><h3>Conclusão</h3></ng-template>
        <small class="muted">Passo {{ path.length }} / ~{{ maxSteps }}</small>
      </div>
      <div class="icon">
        <img *ngIf="currentQuestion.image" [src]="currentQuestion.image" class="q-icon" />
      </div>
    </div>

    <div class="body text-center">
      <h2 class="q-text">{{ currentQuestion.text }}</h2>

      <div *ngIf="!currentQuestion.isConclusion && currentQuestion.options.length; else conclusionBlock" class="options mt-4">
        <button
          mat-raised-button
          color="primary"
          class="w-100 mb-2"
          *ngFor="let opt of currentQuestion.options"
          (click)="selectOption(opt)"
          [disabled]="answered"
        >
          {{ opt.text }}
        </button>
      </div>

      <ng-template #conclusionBlock>
        <p class="lead mt-3">{{ currentQuestion.text }}</p>
        <div *ngIf="currentQuestion.options.length">
          <button mat-stroked-button color="primary" (click)="restart()">Recomeçar</button>
        </div>
        <div *ngIf="!currentQuestion.options.length" class="mt-3">
          <button mat-stroked-button color="primary" (click)="restart()">Recomeçar</button>
        </div>
      </ng-template>
    </div>

    <mat-progress-bar mode="determinate" [value]="progressValue" class="mt-4"></mat-progress-bar>
  </mat-card>
</div>
  `,
  styles: [`
.quiz-wrap { min-height: 84vh; padding: 2rem; background: linear-gradient(180deg,#fbfbff,#f3f8ff); }
.quiz-card { max-width: 600px; width: 100%; padding: 1.6rem; border-radius: 1rem; }
.q-icon { width: 72px; height: 72px; object-fit: contain; }
.q-text { font-weight: 600; margin-top: 0.6rem; }
.options button { font-size: 1.05rem; padding: 0.9rem; border-radius: 12px; }
.header .muted { color: rgba(0,0,0,0.5); font-size: 0.85rem; }
`],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        group([
          query(':enter', [
            style({ transform: 'translateX(40px)', opacity: 0 }),
            animate('380ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
          ], { optional: true }),
          query(':leave', [
            animate('300ms ease-in', style({ transform: 'translateX(-40px)', opacity: 0 }))
          ], { optional: true })
        ])
      ]),
      transition(':decrement', [
        group([
          query(':enter', [
            style({ transform: 'translateX(-40px)', opacity: 0 }),
            animate('380ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
          ], { optional: true }),
          query(':leave', [
            animate('300ms ease-in', style({ transform: 'translateX(40px)', opacity: 0 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class QuizComponent {
  // índice atual (coincide com `index` do question)
  currentIndex = 1;
  answered = false;

  // controle simples de progresso (número aproximado de passos relevantes)
  maxSteps = 6;
  path: number[] = [1]; // histórico de índices visitados

  // --- perguntas / conclusões mapeadas a partir do seu excalidraw (ajustadas) ---
  questions: Question[] = [
    {
      index: 1,
      text: 'Você já tem pensão determinada pelo juiz?',
      image: this.icon('question'),
      options: [
        { text: 'Sim', next: 2 },
        { text: 'Não', next: 4 } // segue para fluxo de investigação / fixação
      ]
    },

    {
      index: 2,
      text: 'O pai está cumprindo corretamente com o pagamento da pensão?',
      image: this.icon('check'),
      options: [
        { text: 'Sim, mas o valor está muito baixo', next: 5 },
        { text: 'Não, ele parou de pagar ou não paga direito', next: 3 }
      ]
    },

    {
      index: 3,
      text: 'Conclusão: Cobrança dos atrasados e medidas (intimação, bloqueio, possibilidade de prisão civil).',
      image: this.icon('law'),
      options: [], // nó de conclusão
      isConclusion: true
    },

    {
      index: 4,
      text: 'O pai registrou a criança?',
      image: this.icon('id'),
      options: [
        { text: 'Sim', next: 6 },
        { text: 'Não', next: 8 }
      ]
    },

    {
      index: 5,
      text: 'O valor fixado judicialmente está baixo?',
      image: this.icon('scale'),
      options: [
        { text: 'Sim, está muito baixo', next: 7 },
        { text: 'Não, o valor é justo', next: 3 } // encaminha para cobrança dos atrasados (ou conclusão)
      ]
    },

    {
      index: 6,
      text: 'O pai trabalha registrado?',
      image: this.icon('briefcase'),
      options: [
        { text: 'Sim, com carteira assinada', next: 10 },
        { text: 'Não, trabalha autônomo', next: 10 },
        { text: 'Não, está desempregado', next: 10 },
        { text: 'Desconheço', next: 10 }
      ]
    },

    {
      index: 7,
      text: 'Conclusão: Revisional + Cobrança dos atrasados (avaliar valor atual e propor revisional).',
      image: this.icon('gavel'),
      options: [],
      isConclusion: true
    },

    {
      index: 8,
      text: 'Conclusão: Investigação de paternidade + fixação de pensão (proceder investigação/reconhecimento).',
      image: this.icon('dna'),
      options: [],
      isConclusion: true
    },

    {
      index: 9,
      text: 'Quantos filhos dependem dessa pensão?',
      image: this.icon('users'),
      options: [
        { text: '1', next: 11 },
        { text: '2', next: 11 },
        { text: '3 ou mais', next: 11 }
      ]
    },

    {
      index: 10,
      text: 'Qual a renda aproximada do pai?',
      image: this.icon('money'),
      options: [
        { text: 'Até R$ 2.000', next: 12 },
        { text: 'De R$ 2.000 a R$ 3.000', next: 13 },
        { text: 'De R$ 3.000 a R$ 4.000', next: 13 },
        { text: 'De R$ 4.000 a R$ 5.000', next: 13 },
        { text: 'Acima de R$ 5.000', next: 13 }
      ]
    },

    {
      index: 11,
      text: 'Ok — esse número de filhos será usado no cálculo da pensão (seguimos para renda).',
      image: this.icon('info'),
      options: [
        { text: 'Prosseguir para renda', next: 10 }
      ]
    },

    {
      index: 12,
      text: 'Conclusão: Fixação de pensão (sem trabalho registrado / renda baixa) — adotar medidas apropriadas ao caso.',
      image: this.icon('fix'),
      options: [],
      isConclusion: true
    },

    {
      index: 13,
      text: 'Conclusão: Fixação de pensão considerando renda do pai (possibilidade de desconto na folha se registrado) — ações a propor.',
      image: this.icon('bank'),
      options: [],
      isConclusion: true
    }
  ];

  // helper: localizar pergunta atual por `index`
  get currentQuestion(): Question {
    const q = this.questions.find((x) => x.index === this.currentIndex);
    // fallback para evitar undefined
    return q ?? { index: -1, text: 'Fluxo não encontrado', options: [], image: this.icon('question'), isConclusion: true };
  }

  // progresso simples: baseado no comprimento do caminho / maxSteps
  get progressValue() {
    const p = Math.min(100, Math.round((this.path.length / this.maxSteps) * 100));
    return p;
  }

  // Seleção de opção: vai para option.next (se houver) e registra o caminho
  selectOption(option: Option) {
    if (!option?.next) return;

    this.answered = true;

    // animação / bloqueio curto para sensação de resposta
    setTimeout(() => {
      this.answered = false;

      this.currentIndex = option.next!;
      this.path.push(this.currentIndex);

      // se for conclusão terminal, podemos ajustar maxSteps para refletir (opcional)
      if (this.currentQuestion.isConclusion) {
        // curta lógica: manter o progresso como completo
        this.path.push(this.currentIndex);
      }
    }, 380);
  }

  restart() {
    this.currentIndex = 1;
    this.path = [1];
    this.answered = false;
  }

  // pequenas músicas/sons ou confete podem ser adicionados (opcional)
  // --------- helper de ícones (retorna URLs públicas) ----------
  private icon(kind: string): string {
    // URLs públicas usadas no exemplo — substitua pelos seus SVGs ou assets locais
    const icons: Record<string, string> = {
      question: 'https://cdn-icons-png.flaticon.com/512/159/159604.png',
      check: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
      law: 'https://cdn-icons-png.flaticon.com/512/2683/2683496.png',
      id: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      scale: 'https://cdn-icons-png.flaticon.com/512/263/263115.png',
      briefcase: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
      gavel: 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png',
      dna: 'https://cdn-icons-png.flaticon.com/512/3449/3449734.png',
      users: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      money: 'https://cdn-icons-png.flaticon.com/512/1536/1536500.png',
      info: 'https://cdn-icons-png.flaticon.com/512/1828/1828859.png',
      fix: 'https://cdn-icons-png.flaticon.com/512/1091/1091806.png',
      bank: 'https://cdn-icons-png.flaticon.com/512/619/619034.png'
    };
    return icons[kind] ?? icons['question'];
  }
}
