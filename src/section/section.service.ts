import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSectionDto } from './dto/create-section.dto';
import { SectionRepository } from './section.repository';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionRepository)
    private sectionRepository: SectionRepository,
  ) {}

  async createNewSection(
    course_id: string,
    createSectionDto: CreateSectionDto,
  ): Promise<object> {
    // save newsection
    const tempNewSection = await this.sectionRepository.createnewsection(
      course_id,
      createSectionDto,
    );

    // return needed data
    const newSection = {
      section_id: tempNewSection.section_id,
      sectionTitle: tempNewSection.sectionTitle,
      sectionIntro: tempNewSection.sectionIntro,
    };
    return newSection;
  }

  async updateSection(
    section_id: string,
    createSectionDto: CreateSectionDto,
  ): Promise<object> {
    // updated section
    const tempUpdatedSection = await this.sectionRepository.updatesection(
      section_id,
      createSectionDto,
    );

    // return needed data
    const updatedSection = {
      sectionTitle: tempUpdatedSection.sectionTitle,
      sectionIntro: tempUpdatedSection.sectionIntro,
    };
    return updatedSection;
  }

  async deleteSection(section_id: string): Promise<void> {
    return this.sectionRepository.deletesection(section_id);
  }
}
