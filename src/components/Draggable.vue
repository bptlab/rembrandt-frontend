<template>
  <div ref="draggable" class="draggable" :style="{transform: translate}">
    <div class="element">
      <span>Draggable</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import interact from 'interactjs';
import { ResourceType, ResourceTypeNullObject, Ingredient, IngredientType } from '@/apis/rembrandt/rembrandt';

export interface DropzoneEvent extends CustomEvent {
  details: {
    dropzoneComponent: Draggable;
    dropzone: any;
    draggable: any;
  };
}

export interface Connector {
  resourceType: ResourceType;
  disabled: boolean;
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

  public ingredientType!: IngredientType;

  public inputs: Draggable[] = [];

  public output?: Draggable;

  public position: any = { x: 0, y: 0 };

  public inputConnectors: Connector[] = [];
  public outputConnector: Connector = {
    resourceType: ResourceTypeNullObject,
    disabled: true,
  };
  // endregion

  // region private members

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
    this.updateDropzones();
  }

  public updated() {
    this.updateDropzones();
  }

  public addInput(ingredient: Draggable) {
    this.inputs.push(ingredient);
    if (ingredient.outputConnector) {
      const outputResourceType = ingredient.outputConnector.resourceType;
      const connector = this.inputConnectors.find((inputConnector) => {
        return inputConnector.resourceType.id === outputResourceType.id;
      });
      if (connector) {
        connector.disabled = true;
      }
    }
  }

  public addOutput(ingredient: Draggable) {
    this.output = ingredient;
    this.outputConnector.disabled = true;
  }

  public clearConnections() {
    if (this.output) {
      const nextInputConnector = this.output.inputConnectors.find((inputConnector) => {
        return inputConnector.resourceType.id === this.outputConnector.resourceType.id;
      });
      if (nextInputConnector) {
        nextInputConnector.disabled = false;
      }
    }
    this.output = undefined;

    for (const input of this.inputs) {
      input.outputConnector.disabled = false;
    }
    this.inputs = [];

    this.outputConnector.disabled = false;
    this.inputConnectors.forEach((inputConnector) => inputConnector.disabled = false);
  }

  public toIngredient(): Ingredient {
    return {
      inputs: this.inputs.map((input) => input.toIngredient()),
      ingredientObject: this.ingredientObject,
      ingredientType: this.ingredientType,
      position: this.position,
    };
  }
  // endregion

  // region private methods
  public dropped(event: DropzoneEvent): void {
    if (this.$refs.inputDropzones) {
      for (const inputDropzone of this.$refs.inputDropzones as HTMLDivElement[]) {
        if (event.detail.dropzone === inputDropzone) { return; }
      }
    }
    if (this.$refs.outputDropzone && event.detail.dropzone === this.$refs.outputDropzone) { return; }

    if (event.detail.dropzone.classList.contains('input-connector')) {
      event.detail.dropzoneComponent.addInput(this);
      this.addOutput(event.detail.dropzoneComponent);
    } else {
      this.addInput(event.detail.dropzoneComponent);
      event.detail.dropzoneComponent.addOutput(this);
    }

    this.adjustPositionToDropzone(event.detail.draggable, event.detail.dropzone);
    // console.log(JSON.stringify(this.toIngredient()));
  }

  protected adjustPositionToDropzone(draggable: any, dropzone: any) {
    const draggablePosition = draggable.getBoundingClientRect();
    const dropzonePosition = dropzone.getBoundingClientRect();
    if (dropzone.classList.contains('input-connector')) {
      this.position.x += dropzonePosition.right - draggablePosition.right + 32;
    } else {
      this.position.x += dropzonePosition.left - draggablePosition.left - 32;
    }
    this.position.y += dropzonePosition.top - draggablePosition.top;
  }

  protected updateDropzones() {
    if (this.$refs.outputDropzone) {
      const outputAccepts = `.input-${(this.$refs.outputDropzone as HTMLElement).getAttribute('accepts')}`;
      this.enableDropzone(this.$refs.outputDropzone as HTMLDivElement, outputAccepts);
    }

    if (this.$refs.inputDropzones) {
      for (const inputDropzone of this.$refs.inputDropzones as HTMLDivElement[]) {
        const inputAccepts = `.output-${inputDropzone.getAttribute('accepts')}`;
        this.enableDropzone(inputDropzone, inputAccepts);
      }
    }
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
        this.clearConnections();
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
    interact(dropzone).unset();
    interact(dropzone).dropzone({
      accept,
      overlap: 0.5,

      ondropactivate: (event) => {
        if (event.target.classList.contains('disabled')) { return; }
        event.target.classList.add('drop-active');
      },
      ondragenter: (event) => {
        if (event.target.classList.contains('disabled')) { return; }
        event.target.classList.add('drop-target');
      },
      ondragleave: (event) => {
        event.target.classList.remove('drop-target');
      },
      ondrop: (event) => {
        if (event.target.classList.contains('disabled')) { return; }
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
  touch-action: none;
  color: @primary;

  .element {
    z-index: 0;
    border-radius: 5px;
    height: 100px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: @accent;
    padding: 0 @spacing * 2;
  }

  .input-connector-wrapper,
  .output-connector-wrapper {
    position: absolute;
    z-index: 1;

    width: 200px;
    pointer-events: none;
    display: flex;
    flex-direction: column;

    .connector {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      position: relative;

      &:after {
        position: absolute;
        top: 0;
        right: -@spacing * 2;
        content: "";
        height: 100%;
        width: @spacing * 4;
        background-color: yellow;
        clip-path: polygon(
          calc(100% - @spacing * 2) 0%,
          100% 50%,
          calc(100% - @spacing * 2) 100%,
          0% 100%,
          calc(0% + @spacing * 2) 50%,
          0% 0%
        );
      }

      &.disabled {
        display: none;
      }

      &.drop-active {
        &:after {
          background-color: green;
        }
      }

      &.drop-target {
        &:after {
          background-color: lightseagreen;
        }
      }
    }
  }

  .input-connector-wrapper {
    left: -200px;

    .connector {
      padding-right: @spacing;

      &:after {
        right: -@spacing * 2;
      }
    }
  }

  .output-connector-wrapper {
    right: -200px;

    .connector {
      padding-left: @spacing * 3;

      &:after {
        left: -@spacing * 2;
      }
    }
  }
}
</style>
