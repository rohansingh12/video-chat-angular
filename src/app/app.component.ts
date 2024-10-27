import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
  StreamAutocompleteTextareaModule,
  StreamChatModule,
} from 'stream-chat-angular';
import { CallingService } from './calling.service';
import { CommonModule } from '@angular/common';

// Video imports
import { CallComponent } from './call/call.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule,
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    CommonModule,
    CallComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  callingService: CallingService;
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    callingService: CallingService
  ) {
    this.callingService = callingService;
    const apiKey = 'vnge785e6tda';
    const userName = 'rohan37';
    const userToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9oYW4zNyJ9.6mEJ7z0OQh9mANjkLjR-S3uTFRZHg15R6hh2A6nnvwg';
    this.chatService.init(apiKey, userName, userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel(
      'messaging',
      'gaming',
      {
        // add as many custom fields as you'd like
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
        name: 'Angular Chat Project',
      }
    );
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'gaming' },
    });
  }

  startCall() {
    const channelId = this.channelService.activeChannel?.id;
    this.callingService.setCallId(channelId);
  }
}
