import { LitElement, html } from "lit"
import { customElement, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import elementStyles from "./site-header.scss"
import "./menu-button"

/**
 * A site header with an animated menu button.
 *
 * @slot - Site title and/or logo with link to root.
 */
@customElement("site-header")
export class SiteHeader extends LitElement {
  static override styles = elementStyles
  @state() private menuOpen = false

  override render() {
    const { menuOpen } = this
    const navClasses = { open: menuOpen }

    return html`
      <header>
        <section class="brand">
          <slot name="site-name"></slot>
        </section>

        <nav class=${classMap(navClasses)}>
          <slot name="nav-links"></slot>
        </nav>

        <section class="buttons">
          <slot name="nav-buttons"></slot>
        </section>
        
        <menu-button
          id="mobile-menu-button"
          @opened=${this.openNav}
          @closed=${this.closeNav}
        ></menu-button>
      </header>
    `
  }

  private openNav() {
    this.menuOpen = true
    document.body.classList.add("menu-open")
  }

  private closeNav() {
    this.menuOpen = false
    document.body.classList.remove("menu-open")
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "site-header": SiteHeader
  }
}
