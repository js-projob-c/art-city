import { Injectable } from '@nestjs/common';
import { ProjectEntity } from 'src/entities';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';

@Injectable()
@EventSubscriber()
export class ProjectSubscriber
  implements EntitySubscriberInterface<ProjectEntity>
{
  listenTo() {
    return ProjectEntity;
  }

  afterUpdate(event: UpdateEvent<ProjectEntity>) {
    console.log(`After Project Update: `, event.entity);
  }
}
