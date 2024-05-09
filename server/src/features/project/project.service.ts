import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/database/repositories';
import { ProjectEntity } from 'src/entities';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(payload: Partial<ProjectEntity>) {
    const projectEntity = this.projectRepository.create(payload);
    return await this.projectRepository.save(projectEntity);
  }

  async updateProject(projectId: string, payload: Partial<ProjectEntity>) {
    return await this.projectRepository.save({
      ...payload,
      id: projectId,
    });
  }
}
