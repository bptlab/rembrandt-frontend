<template>
  <div ref="draggable" class="draggable" :style="{transform: translate}">
    <div class="element">
      <span>Draggable</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Ingredient } from '@/plugins/RecipeModeler';
import interact from 'interactjs';

export interface DropzoneEvent extends CustomEvent {
  details: {
    dropzoneComponent: Draggable;
    dropzone: any;
    draggable: any;
  };
}

@Component
export default class Draggable extends Vue implements Ingredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject: any;

  public input?: Draggable | Draggable[];

  public output?: Draggable;


  // endregion

  // region private members
  protected position = { x: 0, y: 0 };

  protected isBeeingDragged: boolean = false;

  protected get translate() {
    return `translate(${this.position.x}px, ${this.position.y}px)`;
  }

  protected get draggable(): HTMLDivElement {
    return this.$refs.draggable as HTMLDivElement;
  }
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.draggable.addEventListener('dropped', (event) => this.dropped(event as DropzoneEvent));
    this.enableDraggable();
  }

  public addInput(ingredient: Draggable) {
    this.input = ingredient;
  }

  public addOutput(ingredient: Draggable) {
    this.output = ingredient;
  }
  // endregion

  // region private methods
  protected dropped(event: DropzoneEvent): void {
    this.adjustPositionToDropzone(event.detail.draggable, event.detail.dropzone);
  }

  protected adjustPositionToDropzone(draggable: any, dropzone: any) {
    const draggablePosition = draggable.getBoundingClientRect();
    const dropzonePosition = dropzone.getBoundingClientRect();
    this.position.x += dropzonePosition.left - draggablePosition.left + 4;
    this.position.y += dropzonePosition.top - draggablePosition.top + 4;
  }

  protected enableDraggable() {
    interact(this.draggable).draggable({
      modifiers: [
        interact.modifiers.restrict({
          restriction: 'parent',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        }),
        interact.modifiers.snap({
          targets: [(interact as any).createSnapGrid({ x: 10, y: 10 } as any)],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
      ],
      onstart: () => {
        this.isBeeingDragged = true;
      },
      onmove: (event) => {
        this.position.x = this.position.x + event.dx;
        this.position.y = this.position.y + event.dy;
      },
      onend: () => {
        this.isBeeingDragged = false;
      },
    });
  }

  protected enableDropzone(dropzone: HTMLElement, accept: string) {
    interact(dropzone).dropzone({
      accept: accept,
      overlap: 0.5,

      ondropactivate: (event) => {
        event.target.classList.add('drop-active');
      },
      ondragenter: (event) => {
        event.target.classList.add('drop-target');
      },
      ondragleave: (event) => {
        event.target.classList.remove('drop-target');
      },
      ondrop: (event) => {
        const customEvent = new CustomEvent('dropped', {
          detail: {
            dropzone: event.target,
            draggable: event.relatedTarget,
            dropzoneComponent: this,
          },
        }) as DropzoneEvent;
        event.relatedTarget.dispatchEvent(customEvent);
      },
      ondropdeactivate: (event) => {
        event.target.classList.remove('drop-target');
        event.target.classList.remove('drop-active');
      },
    });
  }
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

div.draggable {
  position: absolute;
  display: flex;
  width: fit-content;
  touch-action: none;

  .element {
    background-color: @accent;
    height: 100px;
    width: 200px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @primary;
    z-index: 1;
  }

  .inputConnector {
    position: absolute;
    left: -208px;
    top: -4px;
    height: 100px;
    width: 200px;
    border: dashed 4px yellow;
    touch-action: none;
    pointer-events: none;
  }

  .outputConnector {
    position: absolute;
    right: -208px;
    top: -4px;
    height: 100px;
    width: 200px;
    border: dashed 4px yellow;
    touch-action: none;
    pointer-events: none;
  }

  .drop-active {
    border-color: green !important;
  }
  .drop-target {
    background-color: #29e;
  }
}
</style>
