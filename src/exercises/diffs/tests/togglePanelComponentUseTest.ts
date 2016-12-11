import {TestBed} from "@angular/core/testing";
import "initTestBed";
import {AppComponent} from "../AppComponent";
import {app_html, video_video_html, toggle_panel_togglePanel_html, thumbs_thumbs_html} from "../code";
import {AppModule} from "../AppModule";
import {VideoComponent} from "../video/VideoComponent";
import {VideoService} from "../video/VideoService";
import {TogglePanelComponent} from "../toggle-panel/TogglePanelComponent";
import {ThumbsComponent} from "../thumbs/ThumbsComponent";
import {Api} from "../Api";
const video = Api.fetch('')[0];

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent, VideoComponent, TogglePanelComponent, ThumbsComponent]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: app_html}});
  TestBed.overrideComponent(ThumbsComponent, {set: {template: thumbs_thumbs_html}});
  TestBed.overrideComponent(VideoComponent, {set: {template: video_video_html}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: toggle_panel_togglePanel_html}});
  TestBed.compileComponents();
});

describe('Component tree', () => {
  it(`AppModule: Add the TogglePanelComponent to the AppModule declarations.`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata("annotations", AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Keep the video component`).contains(VideoComponent);
    chai.expect(metadata[0].declarations, `Keep the app component`).contains(AppComponent);
    chai.expect(metadata[0].declarations, `Add TogglePanelComponent`).contains(TogglePanelComponent);
  });

  it(`video.html: Use the TogglePanel component in the template`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let panel = fixture.nativeElement.querySelector('my-toggle-panel');
    chai.expect(panel).is.not.null
  });


  it(`video.html: Add .description as TogglePanel's content`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let panel = fixture.nativeElement.querySelector('my-toggle-panel');

    chai.expect(panel.querySelector('.description')).is.not.null;
    chai.expect(panel.querySelector('.extra')).is.null;

    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should display description text.`).contains(video.description);
    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should not display likes `).not.contains(video.likes);
  });

  it(`video.html: Add .extra as TogglePanel's content`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let panel = fixture.nativeElement.querySelector('my-toggle-panel');

    panel.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(panel.querySelector('.description')).is.null.null;
    chai.expect(panel.querySelector('.extra')).is.not.null;

    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should not description text.`).not.contains(video.description);
    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should display likes`).contains(video.likes);

  });
});

