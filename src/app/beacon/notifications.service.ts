import { Injectable } from '@angular/core';
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { Message } from 'nativescript-plugin-firebase';
import { MessageType } from 'app/message-type';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as firebase from 'nativescript-plugin-firebase';
import {
  LocalNotifications,
  ReceivedNotification,
} from 'nativescript-local-notifications';
import { SnackBar } from '@nstudio/nativescript-snackbar';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly snackbar = new SnackBar();

  constructor() {
    this.setupNotificationsHandling();
    this.setupLocalNotificationsHandling();
  }

  private setupNotificationsHandling(): void {
    firebase.addOnMessageReceivedCallback((notification: Message) => {
      this.handleNotification(notification);
    });
  }

  private setupLocalNotificationsHandling(): void {
    LocalNotifications.addOnMessageReceivedCallback(
      (notification: ReceivedNotification) => {
        // doesn't work when in foreground - library problem
        this.handleBasicNotification(notification);
      }
    );
  }

  private handleNotification(notification: Message): void {
    switch (notification.data.messageType) {
      case MessageType.RECURRING:
        this.setupRecurringNotifications(notification);
        break;
      default:
        this.handleBasicNotification(notification);
    }
  }

  private handleBasicNotification({
    title,
    body,
    foreground,
  }: {
    title?: string;
    body?: string;
    foreground: boolean;
  }): void {
    if (foreground) {
      TNSFancyAlert.showInfo(title, body);
    }
  }

  private setupRecurringNotifications(notification: Message): void {
    const notificationDate = new Date();
    notificationDate.setHours(
      notification.data.hour,
      notification.data.minute,
      0
    );

    dialogs
      .confirm({
        title: 'New recurring notification',
        message: `Do you want to setup new recurring notification to run at ${formatDate(
          notificationDate,
          'shortTime',
          'en-US'
        )}?`,
        okButtonText: 'Yes',
        cancelButtonText: 'No',
      })
      .then((result: boolean) => {
        if (!result) {
          return;
        }

        this.scheduleLocalNotifications(
          notificationDate,
          notification.data.messageTitle,
          notification.data.messageBody,
          notification.data.messageImage
        );
      });
  }

  private scheduleLocalNotifications(
    notificationDate: Date,
    messageTitle: string,
    messageBody: string,
    imageUrl: string
  ): void {
    LocalNotifications.schedule([
      {
        title: messageTitle,
        body: messageBody,
        at: notificationDate,
        interval: 'day',
        image: imageUrl,
      },
    ])
      .then(() => {
        this.snackbar.simple(
          `New local notification scheduled at ${formatDate(
            notificationDate,
            'shortTime',
            'en-US'
          )}`,
          '#000',
          '#d3d3d3'
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`Error during scheduling new local notification: ${error}`);
      });
  }
}
